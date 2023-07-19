import Header from '../../components/Header/header';
const Layout2 = ({ children }) => {
  return (
    <>
      <div className="flex flex-col justify-between h-screen w-full">
        <div>
          <Header />
        </div>

        <div
          data-layout="centered"
          className="w-full xl:h-screen lg:h-full md:h-4/5 h-screen  flex items-center justify-end"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout2;
