import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-100 bg-white/50 py-8 px-6 transition-all duration-300 md:px-10 dark:border-slate-800 dark:bg-slate-950/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          {/* Left: Branding & Copyright */}
          <div className="flex flex-col items-center gap-1 md:items-start">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white">
              FinanceDash <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-md">v1.0.4</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-500">
              © {currentYear} Created with <Heart size={10} className="inline text-rose-500 fill-rose-500" /> by <span className="font-medium text-gray-700 dark:text-slate-300">Sayantan Pachal</span>
            </p>
          </div>
          {/* Center: Legal Links */}
          <nav className="flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-600">
            <Link
              to="/privacy"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Terms
            </Link>
            <Link
              to="/support"
              className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              Support
            </Link>
          </nav>
          {/* Right: Social/External Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/sayantan-pachal"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-all hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-500 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
            >
              {/* <Github size={16} /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 612 612"
                className="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z" />
              </svg>
            </a>
            <a
              href="https://sayantanpachal.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-500 transition-all hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-500 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
            >
              <Globe size={16} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;