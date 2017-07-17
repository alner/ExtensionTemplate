import qlik from 'qlik'
import './styles.css'

export default ($element, layout) => {
    console.log(qlik)
    const node = document.createElement("h1")
    node.className="qv-object-test-extension"
    node.innerHTML = "<h1>Hello world</h1>"
    $element.html(node)
}
