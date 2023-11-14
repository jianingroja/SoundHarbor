import { cookies } from "next/headers";


export const throttle = (cb:Function, delay:number = 1000) => {
  let shouldWait = false;
  let waitingArgs: any;
  
  const timeoutFunc = () => {
    if (waitingArgs === null) shouldWait = false;
    else {
      cb(...waitingArgs)
      waitingArgs = null;
      setTimeout(timeoutFunc, delay)
    }
  }
  
  return (...args: any) => {
    if (shouldWait) {
      waitingArgs = args
      return;
    };
    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  }
}



export const parseCookies = (str: string) => {
  console.log('str :>> ', typeof str);
  if (!str || str === '') return;
  
  const cookies = str.split(';').map(v => v ? v.split('=') : null);
  if (!cookies) return;
  console.log('cookies :>> ', cookies);

  const cookieJar = cookies.reduce((acc, v) => {
    console.log('acc :>> ', acc);
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {});

  return cookieJar;
}

export const pascalCaseSingleWord = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1);
}



export const truncate = (str:string, maxLength: number) => {
  return str.length > maxLength ? str.substring(0, maxLength-3) + "..." : str;
}