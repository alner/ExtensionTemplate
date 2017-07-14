let element;

export default ($element, layout) => {
    var node = document.createElement("h1");
    node.className="qv-object-test-extension";
    node.innerText = "Hello Qlik!!";
    if($element) element = $element;
    const element$ = $element || element;
    element$.append(node);
}
