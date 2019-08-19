let show = false;

const toggle = () => {
  console.log('toggle');
  show = ! show;
  renderTemplate();
}

const appRoot = document.getElementById('app');
const renderTemplate = () => {
  var template = (
    <div>
      <h1>Visibility Toggle</h1>
      <button onClick={toggle}>{ show ? 'Hide' : 'Show' }</button>
      { show ? <p>These are the details;</p> : '' }
      
    </div>
  );

  ReactDOM.render(template, appRoot);
}
renderTemplate();