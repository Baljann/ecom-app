export default function Footer() {
  return (
    <footer className="border-t-2 border-gray-200 text-white text-center py-8 bg-cyan-800 hidden sm:block">
      <p>Copyright &copy; {new Date().getFullYear()} MINICOM</p>
    </footer>
  );
}