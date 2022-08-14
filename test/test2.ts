type HeadInjectablePicker<E, P extends keyof E> = Pick<Partial<E>, P>;
type HeadInjectable = {
  links?: {
    [name: string]: HeadInjectablePicker<HTMLLinkElement, "href">;
  };
  scripts?: {
    [name: string]: HeadInjectablePicker<HTMLScriptElement, "src">;
  };
  styles?: {
    [name: string]: HeadInjectablePicker<HTMLStyleElement, "innerHTML" | "type">;
  };
};

function head(elements: HeadInjectable): void {
  const link = document.createElement("link");
  const script = document.createElement("script");
  const style = document.createElement("style");

  Object.entries(elements.links ? elements.links : {}).forEach(([key, value]) => {
    link.id = key;
    link.href = value.href as string;
    link.type = "text/css";
    link.rel = "stylesheet";
  });
  Object.entries(elements.scripts ? elements.scripts : {}).forEach(([key, value]) => {
    script.id = key;
    script.src = value.src as string;
    script.type = "application/javascript";
  });
  Object.entries(elements.styles ? elements.styles : {}).forEach(([key, value]) => {
    style.id = key;
    style.innerHTML = value.innerHTML as string;
    style.type = value.innerHTML as string;
  });

  document.getElementsByTagName("head")[0].appendChild(link);
  document.getElementsByTagName("head")[0].appendChild(script);
  document.getElementsByTagName("head")[0].appendChild(style);
}

head({
  links: {
    test: {
      href: "http://localhost:8080/api/v1/projects",
    },
  },
});
