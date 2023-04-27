import { formatPrice } from '@/utils';
import Icon from '@/utils/getIcon';
import { useReducer } from 'react';
import { useCheckoutModal } from '../CheckoutModal';
import { useTreatmentServiceModal } from '../TreatmentServiceModal';
import { toothMapQ1, toothMapQ2, toothMapQ3, toothMapQ4 } from './constants';
import reducer, { Service } from './reducer';

type HandleRemoveServiceProps = {
  owner: number;
  serviceId: string;
};

const TreatmentPlanForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    selected: { id: null, services: [] },
    mapServices: [],
    total: 0,
  });

  console.log({ state });

  const { TreatmentServiceModal, setShowTreatmentServiceModal, setOwnerId } =
    useTreatmentServiceModal(dispatch);

  const { CheckoutModal, setShowCheckoutModal, setCheckoutData } =
    useCheckoutModal();

  function handleSelectTooth(id: number) {
    dispatch({
      type: 'selected',
      payload: {
        id,
      },
    });
  }

  function handleCheckout() {
    setShowCheckoutModal(true);
    setCheckoutData({ services: state.mapServices, total: state.total });
  }

  function handleAddService(ownerId: number) {
    setOwnerId(ownerId);
    setShowTreatmentServiceModal(true);
  }

  function handleRemoveService({ owner, serviceId }: HandleRemoveServiceProps) {
    dispatch({
      type: 'remove-service',
      payload: {
        owner,
        serviceId,
      },
    });
  }

  return (
    <>
      <TreatmentServiceModal />
      <CheckoutModal />
      <form className="h-full max-h-[calc(100vh-180px)] flex gap-2 relative">
        <div
          className={`${
            state.selected?.id ? 'flex' : 'hidden'
          } bg-pucci-50 rounded w-96 max-h-[calc(100%)] flex-col overflow-y-auto overflow-x-hidden`}
        >
          <div
            id="header"
            className="bg-pucci-500 rounded-t p-4 grid grid-cols-3 gap-2 items-center sticky top-0 z-10"
          >
            <p className="font-semibold text-center col-span-1">
              Item {state.selected?.id}
            </p>
            <button
              type="button"
              className="bg-pucci-300 hover:bg-pucci-900 transition-colors py-4 rounded col-span-2 text-xs font-semibold flex items-center justify-center gap-2"
              onClick={() => handleAddService(state.selected.id)}
            >
              <Icon name="add-circle" className="w-4 h-4" />
              Adicionar serviço
            </button>
          </div>
          <div id="service-list" className="flex flex-col gap-2 w-full">
            {state.selected?.services?.map((item: Service) => (
              <div
                key={item.id}
                id="service-item"
                className="h-16 grid grid-rows-2 mx-2 first-of-type:mt-2 p-2 items-center rounded relative bg-pucci-100"
              >
                <p className="font-medium text-sm">{item.title}</p>
                <p className="font-medium text-xs">{formatPrice(item.price)}</p>
                <button
                  type="button"
                  className="p-1 rounded absolute top-1/2 -translate-y-1/2 right-2 bg-red-500 hover:bg-red-900"
                  title="Remover serviço"
                  onClick={() =>
                    handleRemoveService({
                      owner: item.owner,
                      serviceId: item.id,
                    })
                  }
                >
                  <Icon name="trash" className="w-4 h-4 stroke-white" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="h-full w-full flex flex-col items-center justify-center ">
          <div className="w-full text-center bg-pucci-500 p-4 font-bold rounded ">
            Total do tratamento: {formatPrice(state.total)}
          </div>
          <div
            id="teeth-map-row"
            className="h-full w-full grid grid-cols-2 grid-rows-2 "
          >
            <div id="q1" className="flex items-end justify-end py-2">
              {toothMapQ1.map((item) => (
                <div
                  key={item}
                  className="cursor-pointer h-fit"
                  onClick={() => handleSelectTooth(item)}
                >
                  <Icon
                    name={`map${item as (typeof toothMapQ1)[number]}`}
                    className={`stroke-pucci-500 cursor-pointer w-fit h-24 ${
                      state.selected.id === item
                        ? 'fill-amber-500'
                        : 'fill-white'
                    } block m-auto`}
                  />
                </div>
              ))}
            </div>
            <div id="q2" className=" flex items-end justify-start py-2">
              {toothMapQ2.map((item) => (
                <div
                  key={item}
                  className="cursor-pointer h-fit"
                  onClick={() => handleSelectTooth(item)}
                >
                  <Icon
                    name={`map${item as (typeof toothMapQ2)[number]}`}
                    className={`stroke-pucci-500 cursor-pointer w-fit h-24 ${
                      state.selected.id === item
                        ? 'fill-amber-500'
                        : 'fill-white'
                    } block m-auto`}
                  />
                </div>
              ))}
            </div>
            <div id="q4" className="flex items-start justify-end py-2">
              {toothMapQ4.map((item) => (
                <div
                  key={item}
                  className="cursor-pointer h-fit"
                  onClick={() => handleSelectTooth(item)}
                >
                  <Icon
                    name={`map${item as (typeof toothMapQ4)[number]}`}
                    className={`stroke-pucci-500 cursor-pointer w-fit h-24 ${
                      state.selected.id === item
                        ? 'fill-amber-500'
                        : 'fill-white'
                    } block m-auto`}
                  />
                </div>
              ))}
            </div>
            <div id="q3" className="flex items-start justify-start py-2">
              {toothMapQ3.map((item) => (
                <div
                  key={item}
                  className="cursor-pointer h-fit"
                  onClick={() => handleSelectTooth(item)}
                >
                  <Icon
                    name={`map${item as (typeof toothMapQ3)[number]}`}
                    className={`stroke-pucci-500 cursor-pointer w-fit h-24 ${
                      state.selected.id === item
                        ? 'fill-amber-500'
                        : 'fill-white'
                    } block m-auto`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            id="footer-row"
            className="w-full flex items-center justify-center"
          >
            {state.total > 0 ? (
              <button
                type="button"
                onClick={handleCheckout}
                className="bg-lime-500 p-4 text-white rounded w-full font-bold hover:bg-lime-800 transition-colors"
              >
                Finalizar proposta
              </button>
            ) : (
              <div className="bg-blue-500 p-4 w-full rounded text-white text-center font-bold flex items-center justify-center gap-2">
                <Icon name="medkit" className="w-5 h-5 stroke-white" />
                <p>Clique nos dentes para inserir serviços</p>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default TreatmentPlanForm;
