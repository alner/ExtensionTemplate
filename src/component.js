export default ($element, layout) => {
    const node = document.createElement("h1")
    node.className="qv-object-test-extension"
    node.innerHTML = "<h1>Hello Qlik!</h1>"
    $element.html(node)
}
