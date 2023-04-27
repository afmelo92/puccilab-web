import React from 'react';

type ToothMapAProps = {
  className: string;
};

const ToothMapA: React.FC<ToothMapAProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 128 129">
        <path
          stroke="#34052D"
          strokeWidth="1.231"
          d="M57.516 3.156C62.346.8 79.55 5.595 83.362 9.382c11.077 11.005 16 28.235 16 28.235s11.904 40.913 13.539 48c1.127 4.89 3.248 20.848 3.692 25.846 1.01 11.381-17.23 9.847-17.23 9.847s-30.77-.045-33.232 0c-2.461.044-41.914 4.82-51.692-9.847-2.462-3.692-2.462-4.878-3.692-8.615-1.231-3.737-1.708-15.522 1.96-27.004 4.83-15.116 10.222-31.632 17.732-45.611 6.632-12.345 12.308-22.154 14.77-23.385 0 0 3.692-1.23 12.307-3.692Zm0 0c3.428-.98-1.23.6 0 0Z"
        />
        <path
          stroke="#34052D"
          strokeDasharray="2.46 2.46"
          strokeWidth="1.231"
          d="M51.231.222 43.537 127.99M0 46.223h128M0 88.069h128M75.482.151l7.804 127.762"
        />
        <path
          fill="#34052D"
          d="M37.245 38.3V27.58l.512.544h-3.152V27.1h3.792v11.2h-1.152ZM22.794 69.817v-.831l5.936-7.425h1.28l-5.888 7.425-.624-.193h9.008v1.024h-9.712Zm6.32 2.945v-2.945l.032-1.023V66.2h1.12v6.56h-1.152ZM60.984 72.858c-.8 0-1.563-.129-2.288-.385-.726-.266-1.302-.618-1.728-1.055l.56-.913c.352.374.832.683 1.44.928a5.377 5.377 0 0 0 2 .368c.95 0 1.67-.207 2.16-.624.501-.426.752-.98.752-1.664 0-.48-.118-.89-.352-1.232-.224-.352-.608-.624-1.152-.816-.544-.192-1.29-.288-2.24-.288h-2.384l.576-5.616h6.128v1.025h-5.664l.592-.56-.496 4.703-.592-.576h2.096c1.13 0 2.037.14 2.72.416.682.278 1.173.667 1.472 1.168.31.491.464 1.067.464 1.729 0 .629-.15 1.205-.448 1.728-.299.511-.747.917-1.344 1.215-.598.3-1.355.448-2.272.448ZM91.578 72.858c-.992 0-1.83-.22-2.512-.657-.683-.447-1.2-1.087-1.552-1.92-.352-.842-.528-1.85-.528-3.024 0-1.269.213-2.33.64-3.184.437-.863 1.04-1.514 1.808-1.951.768-.438 1.659-.657 2.672-.657.501 0 .981.048 1.44.144.458.096.864.251 1.216.465l-.464.928a2.734 2.734 0 0 0-.992-.4 5.297 5.297 0 0 0-1.184-.128c-1.206 0-2.17.384-2.896 1.152-.715.768-1.072 1.914-1.072 3.44 0 .234.01.528.032.88.032.34.096.682.192 1.023l-.4-.303a3.014 3.014 0 0 1 .688-1.409 3.235 3.235 0 0 1 1.28-.895 4.524 4.524 0 0 1 1.68-.304c.746 0 1.402.138 1.968.415a3.218 3.218 0 0 1 1.328 1.168c.32.502.48 1.094.48 1.776 0 .694-.165 1.302-.496 1.825-.33.511-.79.911-1.376 1.2-.576.277-1.227.416-1.952.416Zm-.048-.977c.533 0 1.002-.096 1.408-.287a2.37 2.37 0 0 0 .976-.848c.234-.374.352-.806.352-1.296 0-.737-.256-1.323-.768-1.76-.502-.438-1.184-.656-2.048-.656-.576 0-1.078.106-1.504.32a2.532 2.532 0 0 0-1.008.88 2.175 2.175 0 0 0-.368 1.248c0 .405.112.794.336 1.168.224.362.554.66.992.895.448.224.992.337 1.632.337ZM27.416 109.684l4.832-10.688.352.512h-6.928l.592-.56v2.656h-1.136v-3.12h8.224v.816l-4.688 10.384h-1.248ZM59.242 109.78c-.896 0-1.67-.128-2.32-.384-.64-.256-1.136-.624-1.488-1.104-.341-.491-.512-1.067-.512-1.728 0-.64.165-1.184.496-1.632.341-.459.832-.811 1.472-1.056.65-.245 1.434-.368 2.352-.368.907 0 1.685.123 2.336.368.65.245 1.146.597 1.488 1.056.352.448.528.992.528 1.632 0 .661-.176 1.237-.528 1.728-.352.48-.854.848-1.504 1.104-.65.256-1.424.384-2.32.384Zm0-.976c.992 0 1.765-.203 2.32-.608.565-.405.848-.955.848-1.648s-.283-1.237-.848-1.632c-.555-.405-1.328-.608-2.32-.608-.992 0-1.765.203-2.32.608-.555.395-.832.939-.832 1.632s.277 1.243.832 1.648c.555.405 1.328.608 2.32.608Zm0-4.64c-.832 0-1.541-.112-2.128-.336-.576-.224-1.019-.544-1.328-.96-.31-.427-.464-.933-.464-1.52 0-.619.16-1.147.48-1.584.33-.448.79-.79 1.376-1.024.587-.235 1.275-.352 2.064-.352.79 0 1.477.117 2.064.352.597.235 1.061.576 1.392 1.024.33.437.496.965.496 1.584 0 .587-.155 1.093-.464 1.52-.31.416-.763.736-1.36.96-.587.224-1.296.336-2.128.336Zm0-.768c.875 0 1.557-.181 2.048-.544.49-.363.736-.848.736-1.456 0-.64-.256-1.136-.768-1.488-.502-.363-1.174-.544-2.016-.544-.843 0-1.515.181-2.016.544-.502.352-.752.843-.752 1.472 0 .619.24 1.109.72 1.472.49.363 1.173.544 2.048.544ZM95.397 98.388c.992 0 1.83.224 2.512.672.683.437 1.2 1.072 1.552 1.904.352.832.528 1.84.528 3.024 0 1.259-.219 2.32-.656 3.184-.427.864-1.024 1.515-1.792 1.952-.768.437-1.659.656-2.672.656-.501 0-.981-.048-1.44-.144a4.066 4.066 0 0 1-1.216-.464l.464-.928c.288.192.619.331.992.416.384.075.779.112 1.184.112 1.206 0 2.166-.384 2.88-1.152.725-.768 1.088-1.915 1.088-3.44 0-.245-.016-.539-.048-.88a4.901 4.901 0 0 0-.176-1.024l.4.304a2.923 2.923 0 0 1-.688 1.424 3.316 3.316 0 0 1-1.28.88 4.44 4.44 0 0 1-1.68.304c-.736 0-1.392-.139-1.968-.416a3.219 3.219 0 0 1-1.328-1.168c-.32-.501-.48-1.093-.48-1.776 0-.704.166-1.312.496-1.824.33-.512.784-.907 1.36-1.184.587-.288 1.243-.432 1.968-.432Zm.048.976c-.533 0-1.008.101-1.424.304-.405.192-.725.469-.96.832s-.352.795-.352 1.296c0 .736.25 1.323.752 1.76.512.437 1.2.656 2.064.656.576 0 1.078-.107 1.504-.32a2.397 2.397 0 0 0 1.008-.88c.245-.373.368-.789.368-1.248 0-.416-.112-.805-.336-1.168-.224-.363-.555-.656-.992-.88-.437-.235-.981-.352-1.632-.352ZM57.24 35.839v-.816l4.656-4.56c.426-.416.746-.779.96-1.088a3.1 3.1 0 0 0 .432-.896 3.02 3.02 0 0 0 .112-.784c0-.651-.224-1.163-.672-1.536-.438-.374-1.088-.56-1.952-.56-.662 0-1.248.101-1.76.304a3.312 3.312 0 0 0-1.296.944l-.816-.704c.437-.512.997-.907 1.68-1.184.682-.278 1.445-.416 2.288-.416.757 0 1.413.122 1.968.368.554.234.981.581 1.28 1.04.31.458.464.997.464 1.616 0 .362-.054.72-.16 1.072-.096.352-.278.725-.544 1.12-.256.384-.635.821-1.136 1.312l-4.272 4.192-.32-.448h6.944v1.024H57.24ZM85.407 38.396c-.81 0-1.579-.128-2.304-.384-.715-.267-1.29-.619-1.728-1.056l.56-.912c.363.373.848.683 1.456.928.619.245 1.29.368 2.016.368.928 0 1.637-.203 2.128-.608.501-.405.752-.95.752-1.632 0-.683-.245-1.227-.736-1.632-.48-.405-1.243-.608-2.288-.608h-.8v-.848l3.456-4.336.16.448h-6.24V27.1h7.2v.816l-3.456 4.336-.56-.368h.432c1.344 0 2.347.299 3.008.896.672.597 1.008 1.365 1.008 2.304 0 .63-.15 1.195-.448 1.696-.299.501-.752.896-1.36 1.184-.597.288-1.35.432-2.256.432Z"
        />
      </svg>
    </div>
  );
};

export default ToothMapA;