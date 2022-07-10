import React from "react";
import console from "react-console";
import Util from "./Util";

export interface ILoggerStaticReturn<T = string> {
  tag: string;
  message: T;
}

export interface ILogger {
  render<T = string>(root: T, context: Console, method: string): void | T;
  warn<T = string>(message: T): void | T;
  error<T = string>(message: T): void | T;
  debug<T = string>(message: T): void | T;
  info<T = string>(message: T): void | T;
  group<T = string>(message: T): void | T;
  groupCollapsed<T = string>(message: T): void | T;
  trace<T = string>(message: T): void | T;
}

export interface ILoggerStatic {
  new (tag: string): ILogger;
  render<T = string>(tag: string, root: T, context: Console, method: string): void | ILoggerStaticReturn<T>;
  warn<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T>;
  error<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T>;
  debug<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T>;
  info<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T>;
  group<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T>;
  groupCollapsed<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T>;
  trace<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T>;
}

@Util.ImplementsStatics<ILoggerStatic>()
class LoggerCore {
  public tag: string;
  public constructor(tag: string) {
    this.tag = tag;
  }

  public render<T = string>(root: T, context: Console, method: string = "log"): void | T {
    console.render<T>(root, context, method);
    return root;
  }

  public log<T = string>(message: T): void | T {
    console.log<T>(
      //@ts-ignore
      <div>
        <strong style={{ color: "#0693e3" }}>{`[${this.tag}] `}</strong>
        {message}
      </div>
    );
    return message;
  }

  public warn<T = string>(message: T): void | T {
    console.warn<T>(
      //@ts-ignore
      <div>
        <strong style={{ color: "orange" }}>{`[${this.tag}] `}</strong>
        {message}
      </div>
    );
    return message;
  }

  public error<T = string>(message: T): void | T {
    console.error<T>(
      //@ts-ignore
      <div>
        <strong style={{ color: "#d44950" }}>{`[${this.tag}] `}</strong>
        {message}
      </div>
    );
    return message;
  }

  public debug<T = string>(message: T): void | T {
    console.debug<T>(
      //@ts-ignore
      <div>
        <strong>{`[${this.tag}] `}</strong>
        {message}
      </div>
    );
    return message;
  }

  public info<T = string>(message: T): void | T {
    console.info<T>(
      //@ts-ignore
      <div>
        <strong>{`[${this.tag}] `}</strong>
        {message}
      </div>
    );
    return message;
  }

  public group<T = string>(message: T): void | T {
    console.group<T>(
      //@ts-ignore
      <div>
        <strong>{`[${this.tag}] `}</strong>
        {message}
      </div>
    );
    return message;
  }

  public groupCollapsed<T = string>(message: T): void | T {
    console.groupCollapsed<T>(
      //@ts-ignore
      <div>
        <strong>{`[${this.tag}] `}</strong>
        {message}
      </div>
    );
    return message;
  }

  public trace<T = string>(message: T): void | T {
    console.trace<T>(
      //@ts-ignore
      <div>
        <strong>{`[${this.tag}] `}</strong>
        {message}
      </div>
    );
    return message;
  }

  public static render<T = string>(tag: string, root: T, context: Console, method: string = "log"): void | ILoggerStaticReturn<T> {
    new LoggerCore(tag).render<T>(root, context, method);
    return {
      tag: tag,
      message: root,
    };
  }

  public static log<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T> {
    new LoggerCore(tag).log<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }

  public static warn<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T> {
    new LoggerCore(tag).warn<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }

  public static error<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T> {
    new LoggerCore(tag).error<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }

  public static debug<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T> {
    new LoggerCore(tag).debug<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }

  public static info<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T> {
    new LoggerCore(tag).info<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }

  public static group<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T> {
    new LoggerCore(tag).group<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }

  public static groupCollapsed<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T> {
    new LoggerCore(tag).groupCollapsed<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }

  public static trace<T = string>(tag: string, message: T): void | ILoggerStaticReturn<T> {
    new LoggerCore(tag).trace<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }
}

const Logger: ILoggerStatic = LoggerCore;
export default Logger;
