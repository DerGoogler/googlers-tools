export default function<T = any>(url: string, callback: (status: XMLHttpRequest["status"], data: T) => void): void {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      callback(xhr.status, xhr.response);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
