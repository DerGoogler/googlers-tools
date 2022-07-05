import React from "react";
import console from "react-console";

interface ILoggerStatic<T = string> {
  tag: string;
  message: T;
}

class InternalLogger {
  private tag: string;
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

  public static render<T = string>(tag: string, root: T, context: Console, method: string = "log"): void | ILoggerStatic<T> {
    new InternalLogger(tag).render<T>(root, context, method);
    return {
      tag: tag,
      message: root,
    };
  }

  public static log<T = string>(tag: string, message: T): void | ILoggerStatic<T> {
    new InternalLogger(tag).log<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }

  public static warn<T = string>(tag: string, message: T): void | ILoggerStatic<T> {
    new InternalLogger(tag).warn<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }

  public static error<T = string>(tag: string, message: T): void | ILoggerStatic<T> {
    new InternalLogger(tag).error<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }

  public static debug<T = string>(tag: string, message: T): void | ILoggerStatic<T> {
    new InternalLogger(tag).debug<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }

  public static info<T = string>(tag: string, message: T): void | ILoggerStatic<T> {
    new InternalLogger(tag).info<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }

  public static group<T = string>(tag: string, message: T): void | ILoggerStatic<T> {
    new InternalLogger(tag).group<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }

  public static groupCollapsed<T = string>(tag: string, message: T): void | ILoggerStatic<T> {
    new InternalLogger(tag).groupCollapsed<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }

  public static trace<T = string>(tag: string, message: T): void | ILoggerStatic<T> {
    new InternalLogger(tag).trace<T>(message);
    return {
      tag: tag,
      message: message,
    };
  }
}

export default InternalLogger;
