const Footer = () => {
  return (
    <footer className="bg-yellow-50 text-center text-yellow-800 text-xs sm:text-sm py-4 px-4 font-body">
      &copy; {new Date().getFullYear()} SmartRecipe. All rights reserved.
    </footer>
  );
};

export default Footer;