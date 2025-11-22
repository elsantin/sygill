export function openInCodePen(code: string, title: string) {
  const data = {
    title: title,
    html: "",
    css: "",
    js: code,
    editors: "001", // JS open
  };

  const json = JSON.stringify(data);

  const form = document.createElement("form");
  form.action = "https://codepen.io/pen/define";
  form.method = "POST";
  form.target = "_blank";

  const input = document.createElement("input");
  input.type = "hidden";
  input.name = "data";
  input.value = json;

  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}
