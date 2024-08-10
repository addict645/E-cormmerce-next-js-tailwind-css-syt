const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors mx-2">Privacy Policy</a>
          <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors mx-2">Terms of Service</a>
          <a href="/contact" className="text-gray-400 hover:text-white transition-colors mx-2">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
