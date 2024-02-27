//@ts-nocheck

import { app, shell, BrowserWindow, ipcMain,screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { PrismaClient } from '@prisma/client';
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
    const result = await prisma.$queryRaw`SELECT 
    o.*, 
    (o.amount * o.price) as total_price,
    u.name as user_name,
    c.name as company_name  -- Assuming there's a relation between Order and User
  FROM 
    "Order" o
  JOIN 
    "User" u ON o.userId = u.id
    JOIN
        "Company" c ON o.companyId = c.id order by o.createdAt desc, o.id desc
`;
    return result ;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }


});


ipcMain.handle('add-order', async (event, args) => {
  // format the date 
  const date = args.createdAt;
  const formattedDate = new Date(date);
  const formattedDateStr = formattedDate.toISOString();

 
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
              name: args.user, // Replace with the customer's name
              // Other user properties if applicable
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
        }
    });
    
} catch (error) {
    console.error('Error creating order:', error);
}

});



ipcMain.handle('fetch-status', async (event, args) => {
  try {
    const result = await prisma.$queryRaw`SELECT 
    count(*) as total_orders,
    sum(amount * price) as total_revenue,
    sum(case when status = 'Pending' then 1 else 0 end) as total_pending
  FROM 
    "Order" o
`;
    return result ;
  } catch (error) {
    console.error('Error fetching status:', error);
    throw error;
  }
});



ipcMain.handle('fetch-company', async (event, args) => {
  try {
    const result = await prisma.company.findMany();
    return result ;
  } catch (error) {
    console.error('Error fetching company:', error);
    throw error;
  }
});

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


ipcMain.handle('remove-orders', async (event, args) => {
  console.log(args);
  
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






