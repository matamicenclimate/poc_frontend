import { Link } from '@/componentes/Elements/Link/Link';
import { Title } from '@/componentes/Elements/Title/Title';
import { Icon } from '@/componentes/Icon/Icon';
import { CLIMATECOIN_ASA_ID, NETWORKNAME, VAULT_CONTRACT_ID } from '@/config';

import { Head } from './Head';
import { Navbar } from './Navbar/Navbar';

interface MainLayoutProps {
  title?: string;
  children: any;
}

export const MainLayout = ({ title, children }: MainLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen flex-col pb-12">
        <Navbar />
        <div className="mx-auto w-full max-w-screen-xl flex-grow">{children}</div>
        <footer className="mx-auto mt-12 w-full max-w-screen-xl">
          <div className="grid grid-cols-3 gap-4">
            <div></div>
            <div>
              <Title size={5} as={3}>
                About us
              </Title>
            </div>
            <div className="flex flex-col space-y-4">
              <Title size={5} as={3}>
                Links
              </Title>
              <Link
                href={`${process.env.REACT_APP_ALGORAND_EXPLORER_URL}application/${Number(
                  VAULT_CONTRACT_ID
                )}`}
                className="inline-flex items-center"
              >
                <Icon id={`network-${NETWORKNAME}`} />
                {NETWORKNAME}
              </Link>
              <Link
                href={`${process.env.REACT_APP_ALGORAND_EXPLORER_URL}asset/${CLIMATECOIN_ASA_ID}`}
                className="flex items-center"
              >
                <img src="/climatecoin-icon.png" className="h-6 w-5 rounded-full" /> Climatecoin
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
