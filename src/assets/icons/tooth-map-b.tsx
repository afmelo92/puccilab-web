import React from 'react';

type ToothMapBProps = {
  className: string;
};

const ToothMapB: React.FC<ToothMapBProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 128 101">
        <path
          stroke="#34052D"
          strokeWidth=".97"
          d="M32.458 4.189c15.515 0 23.819 14.545 30.06 14.545 6.242 0 22.304-16.485 35.88-14.545C108.211 5.59 112.942 29.4 112.942 29.4v9.697c0 2.91-7.758 32-7.758 32S99.367 95.34 85.791 95.34c-13.575 0-12.606-3.878-23.272-3.878-10.667 0-8.728 5.818-21.334 3.878-12.606-1.939-22.303-39.757-22.303-39.757s-5.306-21.492-3.367-28.28c1.94-6.788 6.276-21.175 16.943-23.114Z"
        />
        <path
          stroke="#34052D"
          strokeDasharray="1.94 1.94"
          strokeWidth=".97"
          d="M47.151.152V101M0 36.515h128M0 71.424h128M81.818.152V101"
        />
        <path
          fill="#34052D"
          d="M30.784 27V16.28l.512.544h-3.152V15.8h3.792V27h-1.152ZM59.624 33v-.816l4.656-4.56c.427-.416.747-.779.96-1.088.213-.32.357-.619.432-.896a3.02 3.02 0 0 0 .112-.784c0-.65-.224-1.163-.672-1.536-.437-.373-1.088-.56-1.952-.56-.661 0-1.248.101-1.76.304a3.311 3.311 0 0 0-1.296.944l-.816-.704c.437-.512.997-.907 1.68-1.184.683-.277 1.445-.416 2.288-.416.757 0 1.413.123 1.968.368.555.235.981.581 1.28 1.04.31.459.464.997.464 1.616 0 .363-.053.72-.16 1.072-.096.352-.277.725-.544 1.12-.256.384-.635.821-1.136 1.312l-4.272 4.192-.32-.448h6.944V33h-7.856ZM98.176 27.096c-.81 0-1.579-.128-2.304-.384-.715-.267-1.29-.619-1.728-1.056l.56-.912c.363.373.848.683 1.456.928.619.245 1.29.368 2.016.368.928 0 1.637-.203 2.128-.608.501-.405.752-.95.752-1.632 0-.683-.245-1.227-.736-1.632-.48-.405-1.243-.608-2.288-.608h-.8v-.848l3.456-4.336.16.448h-6.24V15.8h7.2v.816l-3.456 4.336-.56-.368h.432c1.344 0 2.347.299 3.008.896.672.597 1.008 1.365 1.008 2.304 0 .63-.149 1.195-.448 1.696-.299.501-.752.896-1.36 1.184-.597.288-1.35.432-2.256.432ZM26.64 57.056v-.832l5.936-7.424h1.28l-5.888 7.424-.624-.192h9.008v1.024H26.64ZM32.96 60v-2.944l.032-1.024V53.44h1.12V60H32.96ZM63.368 60.096c-.8 0-1.563-.128-2.288-.384-.725-.267-1.301-.619-1.728-1.056l.56-.912c.352.373.832.683 1.44.928a5.377 5.377 0 0 0 2 .368c.95 0 1.67-.208 2.16-.624.501-.427.752-.981.752-1.664 0-.48-.117-.89-.352-1.232-.224-.352-.608-.624-1.152-.816-.544-.192-1.29-.288-2.24-.288h-2.384l.576-5.616h6.128v1.024h-5.664l.592-.56-.496 4.704-.592-.576h2.096c1.13 0 2.037.139 2.72.416.683.277 1.173.667 1.472 1.168.31.49.464 1.067.464 1.728 0 .63-.15 1.205-.448 1.728-.299.512-.747.917-1.344 1.216-.597.299-1.355.448-2.272.448ZM95.424 60.096c-.992 0-1.83-.219-2.512-.656-.683-.448-1.2-1.088-1.552-1.92-.352-.843-.528-1.85-.528-3.024 0-1.27.213-2.33.64-3.184.437-.864 1.04-1.515 1.808-1.952.768-.437 1.659-.656 2.672-.656.501 0 .981.048 1.44.144.459.096.864.25 1.216.464l-.464.928a2.735 2.735 0 0 0-.992-.4 5.303 5.303 0 0 0-1.184-.128c-1.205 0-2.17.384-2.896 1.152-.715.768-1.072 1.915-1.072 3.44 0 .235.01.528.032.88.032.341.096.683.192 1.024l-.4-.304a3.014 3.014 0 0 1 .688-1.408 3.236 3.236 0 0 1 1.28-.896 4.524 4.524 0 0 1 1.68-.304c.747 0 1.403.139 1.968.416a3.219 3.219 0 0 1 1.328 1.168c.32.501.48 1.093.48 1.776 0 .693-.165 1.301-.496 1.824-.33.512-.79.912-1.376 1.2-.576.277-1.227.416-1.952.416Zm-.048-.976c.533 0 1.003-.096 1.408-.288.416-.203.741-.485.976-.848.235-.373.352-.805.352-1.296 0-.736-.256-1.323-.768-1.76-.501-.437-1.184-.656-2.048-.656-.576 0-1.077.107-1.504.32a2.533 2.533 0 0 0-1.008.88 2.175 2.175 0 0 0-.368 1.248c0 .405.112.795.336 1.168.224.363.555.661.992.896.448.224.992.336 1.632.336ZM35.8 88l4.832-10.688.352.512h-6.928l.592-.56v2.656h-1.136V76.8h8.224v.816L37.048 88H35.8ZM64.088 87.096c-.896 0-1.67-.128-2.32-.384-.64-.256-1.136-.624-1.488-1.104-.341-.49-.512-1.067-.512-1.728 0-.64.165-1.184.496-1.632.341-.459.832-.81 1.472-1.056.65-.245 1.435-.368 2.352-.368.907 0 1.685.123 2.336.368.65.245 1.147.597 1.488 1.056.352.448.528.992.528 1.632 0 .661-.176 1.237-.528 1.728-.352.48-.853.848-1.504 1.104-.65.256-1.424.384-2.32.384Zm0-.976c.992 0 1.765-.203 2.32-.608.565-.405.848-.955.848-1.648s-.283-1.237-.848-1.632c-.555-.405-1.328-.608-2.32-.608-.992 0-1.765.203-2.32.608-.555.395-.832.939-.832 1.632s.277 1.243.832 1.648c.555.405 1.328.608 2.32.608Zm0-4.64c-.832 0-1.541-.112-2.128-.336-.576-.224-1.019-.544-1.328-.96-.31-.427-.464-.933-.464-1.52 0-.619.16-1.147.48-1.584.33-.448.79-.79 1.376-1.024.587-.235 1.275-.352 2.064-.352.79 0 1.477.117 2.064.352.597.235 1.061.576 1.392 1.024.33.437.496.965.496 1.584 0 .587-.155 1.093-.464 1.52-.31.416-.763.736-1.36.96-.587.224-1.296.336-2.128.336Zm0-.768c.875 0 1.557-.181 2.048-.544a1.72 1.72 0 0 0 .736-1.456c0-.64-.256-1.136-.768-1.488-.501-.363-1.173-.544-2.016-.544s-1.515.181-2.016.544c-.501.352-.752.843-.752 1.472 0 .619.24 1.11.72 1.472.49.363 1.173.544 2.048.544ZM90.32 77.704c.992 0 1.83.224 2.512.672.683.437 1.2 1.072 1.552 1.904.352.832.528 1.84.528 3.024 0 1.259-.219 2.32-.656 3.184-.427.864-1.024 1.515-1.792 1.952-.768.437-1.659.656-2.672.656-.501 0-.981-.048-1.44-.144a4.057 4.057 0 0 1-1.216-.464l.464-.928c.288.192.619.33.992.416.384.075.779.112 1.184.112 1.205 0 2.165-.384 2.88-1.152.725-.768 1.088-1.915 1.088-3.44 0-.245-.016-.539-.048-.88a4.901 4.901 0 0 0-.176-1.024l.4.304a2.924 2.924 0 0 1-.688 1.424 3.313 3.313 0 0 1-1.28.88 4.445 4.445 0 0 1-1.68.304c-.736 0-1.392-.139-1.968-.416a3.219 3.219 0 0 1-1.328-1.168c-.32-.501-.48-1.093-.48-1.776 0-.704.165-1.312.496-1.824.33-.512.784-.907 1.36-1.184.587-.288 1.243-.432 1.968-.432Zm.048.976c-.533 0-1.008.101-1.424.304a2.28 2.28 0 0 0-.96.832c-.235.363-.352.795-.352 1.296 0 .736.25 1.323.752 1.76.512.437 1.2.656 2.064.656.576 0 1.077-.107 1.504-.32a2.398 2.398 0 0 0 1.008-.88c.245-.373.368-.79.368-1.248 0-.416-.112-.805-.336-1.168-.224-.363-.555-.656-.992-.88-.437-.235-.981-.352-1.632-.352Z"
        />
      </svg>
    </div>
  );
};

export default ToothMapB;
