//@ts-nocheck

import { app, shell, BrowserWindow, ipcMain,screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { PrismaClient } from '@prisma/client';
import { get } from 'http';
import { stat } from 'fs';
import { s } from 'vite/dist/node/types.d-jgA8ss1A';
const prisma = new PrismaClient();
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: Math.round((screen.getPrimaryDisplay().workAreaSize.width * 0.95)), // 80% of screen width
    height: Math.round((screen.getPrimaryDisplay().workAreaSize.height * 0.9)), // 60% of screen height
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? {  } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation:false,
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.


ipcMain.handle('fetch-orders', async (event, args) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) // Date 30 days ago
        }
      },
      orderBy: [
        {
           createdAt: 'desc',
        },
        {
           id: 'desc',
        }
     ],
      include: {
        user: true,
        company: true
      }
    });
  
    return orders;
  }
catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }

});


ipcMain.handle('add-order', async (event, args) => {
  // format the date 
  const date = args.createdAt;
  const formattedDate = new Date(date);
  const formattedDateStr = formattedDate.toISOString();
console.log(args);
 
  try {
   
    let user = await prisma.user.findFirst({
      where: {
          name: args.user, // Replace with the customer's name
      },
  });
  let company = await prisma.company.findFirst({
    where: {
      name: args.company, // Replace with the customer's name
    },
});

  // If the user doesn't exist, create a new user
  if (!user) {
      // Create the new user
      user = await prisma.user.create({
          data: {
              name: args.user,
              phone:'null', // Replace with the customer's name
              createdAt:formattedDateStr// Other user properties if applicable
          },
      });
  }

  if (!company) {
    // Create the new user
    company = await prisma.company.create({
        data: {
            name: args.company, // Replace with the customer's name
            // Other user properties if applicable
        },
    });
}

    const newOrder = await prisma.order.create({
        data: {
          user: {
            connect: { id: user.id } // Connect the order to the found or newly created user by userId
        },
        company: {
          connect: { id: company.id } // Connect the order to the found or newly created user by userId
      },
            amount: args.amount,
            status: args.status,
            unit: args.unit,
            fabricType: args.address,
            price: args.price,
            createdAt: formattedDateStr,
            address: "none",
        },
    });
    
} catch (error) {
    console.error('Error creating order:', error);
}

});



ipcMain.handle('fetch-status', async (event, args) => {
  const today = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

  const currentMonth  = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const nextMonth    = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

    try {
      const result = await prisma.order.aggregate({
        _count: {
          _all: true,
        },
        where: {
          AND: [
            { createdAt: { gte: lastMonthDate} },
            { createdAt: { lte: today } },
            { OR: [{ status: 'Paid' }, { status: 'Pending' }] },
          ],
        },
      });


      const thisMonthRevenue = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: currentMonth, // Start of current month
            lt: nextMonth // Start of next month
          },
          status: 'Paid'
      
        },
        select: {
          amount: true,
          price: true
        },
      });

      let currentRevenue = 0;
      thisMonthRevenue.forEach((order) => {
        const order_totals = order.amount * order.price;
        currentRevenue += order_totals;
      }); 

      const thisMonthCustomers = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: currentMonth, // Start of current month
            lt: nextMonth // Start of next month
          },
        },
        distinct: ['userId'] // Retrieve distinct userIds
      });
    return {
      total_orders: result._count._all,
      total_customers: Object.keys(thisMonthCustomers).length,
      total_revenue: currentRevenue,
    };
    }
  catch (error) {
    console.error('Error fetching status:', error);
    throw error;
  }
});


//get company

ipcMain.handle('fetch-company', async (event, args) => {
  const currentMonth  = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const nextMonth    = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

  try {
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) // Current date minus 30 days
        },
        status: {
          in: ['Pending', 'Paid']
        }
      },
      include: {
        company: true
      }
    });

    const orderSummaryByCompany = {};

    orders.forEach(order => {
      const companyId = order.companyId;
      const companyName = order.company.name;
      const revenue = order.status === 'Paid' ? order.price * order.amount : 0;
      
      if (!orderSummaryByCompany[companyId]) {
        orderSummaryByCompany[companyId] = {
          companyName: companyName,
          total_revenue: revenue,
          companyId: companyId,
          total_orders: 1,
        };
      } else {
        orderSummaryByCompany[companyId].total_revenue += revenue;
        orderSummaryByCompany[companyId].total_orders += 1;
      }
    });

    return Object.values(orderSummaryByCompany);
  }

   catch (error) {
    console.error('Error fetching company:', error);
    throw error;
  }
});


// change status  

ipcMain.handle('change-status', async (event, args) => {
  try {
    const result = await prisma.order.update({
      where: { id: args.id },
      data: { status: args.status },
    });
    return result ;
  } catch (error) {
    console.error('Error changing status:', error);
    throw error;
  }
});


// remove orders

ipcMain.handle('remove-orders', async (event, args) => {
  
  try {
    const result = await prisma.order.delete({
      where: { id: args },
    });
    return result ;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
  
});

ipcMain.handle('fetch-percentage', async (event, args) => {

  //Orders this month
  try
  {
  const currentMonth  = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const lastMonth     = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
  const nextMonth    = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

  
  
  const thisMonthOrders = await prisma.order.count({
    where: {AND: [
      { createdAt: { gte: currentMonth} },
      { createdAt: { lte: nextMonth } },
      { OR: [{ status: 'Paid' }, { status: 'Pending' }] },
    ],
      
    }
  });

  const lastMonthOrders = await prisma.order.count({
    where: {AND: [
      { createdAt: { gte: lastMonth} },
      { createdAt: { lte: currentMonth } },
      { OR: [{ status: 'Paid' }, { status: 'Pending' }] },
    ],
      
    }
  });

  //Customers this month

  const thisMonthCustomers = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: currentMonth, // Start of current month
        lt: nextMonth // Start of next month
      },

    },
    distinct: ['userId'] // Retrieve distinct userIds
  });
  const lastMonthCustomers = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: lastMonth, // Start of last month
        lt: currentMonth // End of last month
      }
    },
    distinct: ['userId'] // Retrieve distinct userIds
  });

  //Revenue this month

const thisMonthRevenue = await prisma.order.findMany({
  where: {
    createdAt: {
      gte: currentMonth, // Start of current month
      lt: nextMonth // Start of next month
    },
    status: 'Paid'

  },
  select: {
    amount: true,
    price: true
  },
});

const lastMonthRevenue = await prisma.order.findMany({
  where: {
    createdAt: {
      gte: lastMonth, // Start of last month
      lt: currentMonth // End of last month
    },
    status: 'Paid'
  },
  select: {
    amount: true,
    price: true
  },
});

let currentRevenue = 0;
let lastRevenue = 0;
thisMonthRevenue.forEach((order) => {
  const order_totals = order.amount * order.price;
  currentRevenue += order_totals;
});

lastMonthRevenue.forEach((order) => {
  const order_totals = order.amount * order.price;
  lastRevenue += order_totals;
});
const denominator = Math.max(lastRevenue,1);

  const orderPercentageChange = ((thisMonthOrders - lastMonthOrders));
  const customerPercentageChange = ((Object.keys(thisMonthCustomers).length - Object.keys(lastMonthCustomers).length));
  const revenuePercentageChange = (((currentRevenue - lastRevenue / denominator * 100).toFixed(2)));
   // Calculate the percentage change in revenue
  return {
    order_percentage_change: orderPercentageChange,
    customer_percentage_change: customerPercentageChange,
    revenuePercentageChange: revenuePercentageChange
  };
}
catch (error) {
  console.error('Error fetching percentage:', error);
  throw error;
}

});

//get all orders
let Config;
let TypeOfOrder;
ipcMain.handle('all-orders', async (event, args) => {


function getOrderBy(args) {
  switch (args) {
    
      case 1:
          
          Config =  [
              { createdAt: 'desc' },
              { id: 'desc' },
          ];
          break;
      case 2:
          
        Config = [
              { user: { name: 'asc' } }
          ];
          break;

      case 3:
          
          Config = [
              { company: { name: 'desc' } }
          ];
          break;
          
      case 4:
          Config = [
              { amount: 'asc' },
              { price: 'asc' },
          ];
          break;
      case 5:
          
          Config = [
              { fabricType: 'asc' },
          ];
          break;
      case 6:
          
          Config = [
              { unit: 'asc' },
          ];
          break;
      default:
        if (Config == null) {
          Config = [{ createdAt: 'desc' }, { id: 'desc' }];
      }
      break;
  }
}
getOrderBy(args);

function Type(args) {
  switch (args) {

      case 7:
          TypeOfOrder = {
              createdAt: {
                  gte: new Date(new Date() - 90 * 24 * 60 * 60 * 1000)   // Date 30 days ago
              }
          };
          break;
      case 8:
          TypeOfOrder ={
                  status: 'Paid',
                  createdAt: {
                      gte: new Date(new Date() - 90 * 24 * 60 * 60 * 1000)   // Date 90 days ago
                  }
          };
          break;

      case 9:
          TypeOfOrder = {
              status: 'Pending',
              createdAt: {
                  gte: new Date(new Date() - 90 * 24 * 60 * 60 * 1000)   // Date 90 days ago
              }
          };
          break;

      case 10:
          TypeOfOrder = {
              status: 'Cancelled',
              createdAt: {
                  gte: new Date(new Date() - 90 * 24 * 60 * 60 * 1000)   // Date 90 days ago
              }
          };
          break;

        case 11:
          TypeOfOrder = {
              createdAt: {
                  gte: new Date(new Date() - 180 * 24 * 60 * 60 * 1000)   // Date 180 days ago
              }
          };
          break;

          case 12:
          TypeOfOrder = {
              createdAt: {
                  gte: new Date(new Date() - 365 * 24 * 60 * 60 * 1000)   // Date 365 days ago
              }
          };
          break;
  
          case 13:
          TypeOfOrder = {
              createdAt: {
                  gte: new Date(new Date() - 730 * 24 * 60 * 60 * 1000)   // Date 730 days ago
              }
          };
          break;

      default:
         if (TypeOfOrder==null){
              createdAt: {
                  gte: new Date(new Date() - 90 * 24 * 60 * 60 * 1000)   // Date 90 days ago
              }
          };
          break;
  }};
  Type(args);

  try {
    const orders = await prisma.order.findMany({
      where: TypeOfOrder,
      orderBy:Config,
      include: {
        user: true,
        company: true
      }

    });
    return orders;
  }
catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }

});


ipcMain.handle('overview-orders', async (event, args) => {
  try {
    const ninetyDaysAgo = new Date(new Date() - 90 * 24 * 60 * 60 * 1000);

    // Count of all orders
    const allOrdersCount = await prisma.order.count({
      where: {
        createdAt: { gte: ninetyDaysAgo }
      }
    });

    // Count of paid orders
    const paidOrdersCount = await prisma.order.count({
      where: {
        status: 'Paid',
        createdAt: { gte: ninetyDaysAgo }
      }
    });

    // Count of pending orders
    const pendingOrdersCount = await prisma.order.count({
      where: {
        status: 'Pending',
        createdAt: { gte: ninetyDaysAgo }
      }
    });

    // Count of cancelled orders
    const cancelledOrdersCount = await prisma.order.count({
      where: {
        status: 'Cancelled',
        createdAt: { gte: ninetyDaysAgo }
      }
  });
  
      return {
        allOrdersCount,
        paidOrdersCount,
        pendingOrdersCount,
        cancelledOrdersCount
      };
}
catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }

});

ipcMain.handle('fetch-customers', async (event, args) => {
  try {
    const customers = await prisma.user.findMany({
      include: {
        orders: true
      }
    });

    return customers;
  }
  
catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }

});


function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}
