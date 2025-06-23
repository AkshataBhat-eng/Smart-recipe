const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center text-gray-600 text-sm p-4 mt-8">
      &copy; {new Date().getFullYear()} SmartRecipe. All rights reserved.
    </footer>
  );
};

export default Footer;