import Modal from '@/app/components/Modal';
import { formatPrice } from '@/utils';
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import { Service } from '../TreatmentPlanForm/reducer';

type CheckoutModalProps = {
  showCheckoutModal: boolean;
  setShowCheckoutModal: Dispatch<SetStateAction<boolean>>;
  checkoutData: { services: Service[]; total: any } | null;
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  showCheckoutModal,
  setShowCheckoutModal,
  checkoutData,
}) => {
  const novoArray: any = useMemo(
    () =>
      checkoutData?.services.reduce((acumulador: any, objeto) => {
        const chave = objeto['owner'];
        if (!acumulador[chave]) {
          acumulador[chave] = [];
        }
        acumulador[chave].push(objeto);
        return acumulador;
      }, {}),
    [checkoutData?.services]
  );

  return (
    <Modal showModal={showCheckoutModal} setShowModal={setShowCheckoutModal}>
      <form className="w-full overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div className="flex flex-col items-center justify-center gap-4 bg-white px-2 py-6 pt-8 text-center md:px-12 rounded max-h-[80vh]">
          <h1 className="text-pucci-500 text-2xl font-bold">
            Resumo do tratamento
          </h1>
          <div id="content" className="w-full overflow-auto">
            {novoArray &&
              Object?.keys(novoArray).length > 0 &&
              Object?.keys(novoArray).map((item, index) => (
                <div
                  key={index}
                  className="text-pucci-500 w-full flex flex-col gap-2 py-4"
                >
                  <strong className="text-xs text-start bg-pucci-500 w-fit text-white p-2 rounded">
                    Item {item}
                  </strong>
                  {novoArray[item].map((itm: Service) => (
                    <div key={itm.id} className="flex gap-2 items-center ">
                      <p className="text-xs">{itm.title}</p>
                      <p className="text-xs">{formatPrice(itm.price)}</p>
                    </div>
                  ))}
                </div>
              ))}
            <strong className="text-pucci-500 text-xl">
              Total {formatPrice(checkoutData?.total)}
            </strong>
          </div>
          <div id="buttons" className="flex gap-2 font-medium">
            <button
              className="bg-gray-400 hover:bg-gray-600 transition-colors py-2 px-4 rounded"
              onClick={() => setShowCheckoutModal(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-800 transition-colors py-2 px-4 rounded disabled:bg-gray-400"
            >
              Confirmar tratamento
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export function useCheckoutModal() {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{
    services: any;
    total: any;
  } | null>(null);

  const CheckoutModalCallback = useCallback(() => {
    return (
      <CheckoutModal
        showCheckoutModal={showCheckoutModal}
        setShowCheckoutModal={setShowCheckoutModal}
        checkoutData={checkoutData}
      />
    );
  }, [showCheckoutModal, setShowCheckoutModal, checkoutData]);

  return useMemo(
    () => ({
      setShowCheckoutModal,
      setCheckoutData,
      CheckoutModal: CheckoutModalCallback,
    }),
    [setShowCheckoutModal, CheckoutModalCallback]
  );
}
