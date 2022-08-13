import pss from 'child_process' 

/**
 * 执行命令
 * @param cmd
 * @param arg
 */
 export const exec = function (cmd: string, ...arg: any): Promise<{ success, message }> {
  return new Promise((resolve, reject) => {
      pss.exec(cmd + (arg.length ? " " + arg.join(' ') : ''), (error, stdout, stderr) => {
          if (error === null) {
              console.log(`[exec success] : \n + ${stdout} `);
              return resolve({success: true, message: stdout});
          } else {
              console.log(`[exec err] : \n + ${stderr} `);
              return resolve({success: false, message: stderr});
          }
      })
  });
}