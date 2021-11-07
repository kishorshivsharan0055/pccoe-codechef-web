import Container from "./container";

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2  bottom-0">
      <Container>
        <div className="py-20 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Codechef PCCOE Chapter
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0">
              #HeadStartCP
            </a>
          </div>
        </div>

        <div className="pb-6 space-x-6 flex  lg:flex-row items-center place-content-center">
          <a href="https://www.instagram.com/pccoe.codechef.chapter/">
            <img src="/instagram.svg" alt="instagram" className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/company/codechef-pccoe-chapter">
            <img src="/linkedin.svg" alt="linkedIn" className="w-6 h-6" />
          </a>
          <a href="https://www.facebook.com/pccoe.codechef.chapter/">
            <img src="/facebook-logo.svg" alt="facebook" className="w-6 h-6" />
          </a>
          <a href="https://twitter.com/CodechefPccoe">
            <img src="/twitter.svg" alt="twitter" className="w-6 h-6" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
