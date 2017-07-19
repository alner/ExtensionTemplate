import qlik from 'qlik';
import './styles.css';

export default ($element, layout) => {
  console.log(qlik, layout);
  const node = document.createElement('h1');
  node.className='qv-object-test-extension';
  node.innerHTML = '<h1>Hello Qlik!</h1>';
  $element.html(node);
};