import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../app/Store/store';
import Topbar from '../app/components/topbar/topbar';
import Footer from '../app/components/footer/footer';
import '../app/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
       
      <Topbar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
}

export default MyApp;