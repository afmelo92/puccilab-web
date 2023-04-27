import Icon from '@/utils/getIcon';
import Header from './components/Header';
import HeroSwiper from './components/HeroSwiper';
import PortfolioSwiper from './components/PortfolioSwiper';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Header />
      {/* HERO */}
      <section
        id="hero"
        className="w-full h-screen -mt-16 grid grid-cols-1 grid-rows-1 bg-pucciWhite bg-opacity-80 relative"
      >
        <HeroSwiper />
        <div
          id="call"
          className="container mx-auto h-full flex flex-col items-center justify-center p-2 lg:p-4 lg:mt-0"
        >
          <Icon
            name="logo-simple"
            className="w-14 h-14 lg:w-24 lg:h-24 stroke-pucci-500 -translate-y-1/2"
          />
          <h1 className="font-thin text-6xl uppercase lg:text-8xl drop-shadow-md text-pucci-500">
            Criamos
          </h1>
          <h2 className="text-4xl text-center lg:text-5xl font-thin text-pucci-500">
            sorrisos perfeitos
          </h2>
          <h3 className="text-center mt-8 text-base lg:text-xl lg:w-2/3 font-light text-pucci-500">
            Faça seus pacientes sorrirem confiantes com próteses dentárias
            artisticamente produzidas de qualidade insuperável e tecnologia de
            ponta.
          </h3>
          <a
            href="https://wa.me/5567992830613?text=Ol%C3%A1!%20Gostaria%20de%20contratar%20seus%20servi%C3%A7os."
            className="w-3/4 lg:w-1/2 text-xl text-center bg-pucci-500 hover:bg-pucci-200 transition-all p-4 font-light mt-12"
          >
            Fazer orçamento
          </a>
        </div>
      </section>

      {/* SPACER */}
      <section id="spacer" className="h-24 lg:h-48 w-full"></section>

      {/* SERVICES */}
      <section
        id="services"
        className="container p-2 grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-4 w-full h-full  lg:p-4"
      >
        <div id="text" className="flex flex-col items-center gap-4">
          <h2 className="text-pucci-500 font-medium text-3xl text-center">
            O que fazemos por você
          </h2>
          <p className="text-pucci-500 text-center max-w-md">
            Queremos elevar o nível do mercado de próteses dentárias. Para isso,
            unimos técnica, qualidade e tecnologia para entregar sorrisos
            perfeitos.
          </p>
        </div>
        <div id="bullets" className="w-full h-full">
          <ul className="text-white w-full flex flex-col gap-2">
            <li className="text-pucci-500 lg:text-pucciWhite lg:bg-pucci-500 p-2 mx-12 text-start">
              ♦ Facetas
            </li>
            <li className="text-pucci-500 lg:text-pucciWhite lg:bg-pucci-500 mx-12 lg:ml-16 p-2 ml-12 text-start">
              ♦ Feldspática
            </li>
            <li className="text-pucci-500 lg:text-pucciWhite lg:bg-pucci-500 mx-12 lg:ml-32 p-2 ml-12 text-start">
              ♦ Coroas
            </li>
            <li className="text-pucci-500 lg:text-pucciWhite lg:bg-pucci-500 mx-12 lg:ml-48 p-2 ml-12 text-start">
              ♦ Restaurações
            </li>
            <li className="text-pucci-500 lg:text-pucciWhite lg:bg-pucci-500 mx-12 lg:ml-64 p-2 ml-12 text-start">
              ♦ Protocolo cerâmico dento-gengival
            </li>
            <li className="text-pucci-500 lg:text-pucciWhite lg:bg-pucci-500 mx-12 lg:ml-80 p-2 ml-12 text-start">
              ♦ Planejamentos
            </li>
          </ul>
        </div>
      </section>

      {/* SPACER */}
      <section id="spacer" className="h-24 w-full"></section>

      <section
        id="contact"
        className="bg-pucci-500 w-full h-fit py-8 flex flex-col gap-8 items-center justify-center"
      >
        <h2 className="text-center text-xl lg:text-2xl">
          Solicite nossa tabela de serviços
        </h2>
        <a
          href="https://wa.me/5567992830613?text=Ol%C3%A1!%20Gostaria%20de%20sua%20tabela%20de%20pre%C3%A7os."
          className="text-center text-2xl text-pucci-500 drop-shadow-xl bg-pucciWhite hover:bg-pucci-200 hover:text-pucciWhite transition-all py-4 w-11/12 lg:w-1/3 font-light"
        >
          Solicitar tabela de serviços
        </a>
        <h2 className="text-center text-xl lg:text-2xl">
          e confira tudo que oferecemos
        </h2>
      </section>

      {/* SPACER */}
      <section id="spacer" className="h-24 lg:h-48 w-full"></section>

      {/* PORTFOLIO */}
      <section
        id="portfolio"
        className="container h-full min-h-[calc(100vh/2)] lg:min-h-[calc(100vh/1.5)] grid grid-cols-1 grid-rows-1 p-2 lg:p-4"
      >
        <div id="text" className="flex flex-col items-center gap-4">
          <h2 className="text-pucci-500 font-medium text-3xl text-start">
            Portfolio
          </h2>
          <PortfolioSwiper />
        </div>
      </section>

      {/* SPACER */}
      <section id="sm-spacer" className="h-16 w-full"></section>

      {/* CONTACT */}
      <section
        id="contact"
        className="w-full h-fit flex flex-col items-center gap-8 py-16 bg-pucci-500"
      >
        <h2 className="text-pucciWhite text-center font-medium text-3xl p-2">
          Deixe-nos criar o sorriso de seus pacientes
        </h2>
        <a
          href="https://wa.me/5567992830613?text=Ol%C3%A1!%20Gostaria%20de%20contratar%20seus%20servi%C3%A7os."
          className="text-center text-2xl text-pucci-500 drop-shadow-xl bg-pucciWhite hover:bg-pucci-200 hover:text-pucciWhite transition-all py-4 w-11/12 lg:w-1/3 font-light"
        >
          Fazer orçamento agora
        </a>
        <p className="font-medium text-pucciWhite">ou</p>
        <a
          href="mailto:contato@puccidentallab.com.br?subject=Gostaria de trabalhar com vocês"
          className="text-center text-lg text-pucciWhite drop-shadow-xl bg-pucci-100 hover:bg-pucci-200 transition-colors py-2 w-11/12 lg:w-1/3 font-light"
        >
          Entre em contato via email
        </a>
      </section>

      {/* SPACER */}
      <section id="sm-spacer" className="h-16 w-full"></section>

      <section className="container w-full h-[calc(100vh/3)]">
        {/* CONTACT -> MAP */}
        {/* <div id="map" className="bg-orange-400 w-full"> */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.2909643878315!2d-54.820309200000004!3d-22.229036500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9489a853cb42db2b%3A0xa98db8f1e73a98ff!2sAv.%20Marcelino%20Pires%2C%20890%20-%20Centro%2C%20Dourados%20-%20MS%2C%2079801-004!5e0!3m2!1spt-BR!2sbr!4v1679112576072!5m2!1spt-BR!2sbr"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full rounded"
        ></iframe>
        {/* </div> */}
      </section>

      {/* SPACER */}
      <section id="sm-spacer" className="h-16 lg:h-32 w-full"></section>

      {/* FOOTER */}
      <footer
        id="footer"
        className="shadow-2xl shadow-black w-full h-full min-h-[calc(100vh/4)] grid grid-cols-1 grid-rows-1 p-4 place-items-center bg-pucci-500"
      >
        <div id="text" className="flex flex-col items-center gap-2 text-center">
          <div className="flex flex-col gap-4 items-center">
            <Icon
              name="logo-simple"
              className="w-8 h-8 stroke-white fill-white stroke-1"
            />
            <h5 className="font-bold text-lg text-center">Pucci Dental Lab</h5>
          </div>
          <p className="text-sm">contato@puccidentallab.com.br</p>
          <h6 className="font-semibold">Horário de funcionamento</h6>
          <p className="text-sm">Segunda à sexta das 08:00 às 18:00</p>

          <p className="text-sm">
            Av. Marcelino Pires 890 - Centro - CEP:79801-004 - Dourados/MS
          </p>

          <h6 className="text-sm font-semibold mt-8">
            Acompanhe nossas redes sociais
          </h6>
          <div>
            <a
              href="https://instagram.com/pucci.lab"
              target="_blank"
              rel="noreferrer"
              className="flex gap-2 items-center text-xs"
            >
              <Icon name="instagram" className="h-6 w-6 fill-white" />
            </a>
          </div>
        </div>
      </footer>
      <div
        id="last-info"
        className="flex flex-col lg:flex-row text-sm p-2 w-full items-center justify-center bg-gradient-to-r from-purple-500 via-rose-600 to-orange-500"
      >
        <p className="text-center">
          ©{new Date().getFullYear()} - www.puccidentallab.com.br
        </p>
        <pre className="hidden lg:block">{` | `}</pre>
        <p>
          Orgulhosamente criado por{' '}
          <a
            href={'https://predatorlabs.com.br'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong className="font-bold text-slate-900">Predator Labs</strong>
          </a>
        </p>
      </div>
    </main>
  );
}
