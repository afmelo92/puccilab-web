import Modal from '@/app/components/Modal';
import { priceMask } from '@/utils';
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ActionProps } from '../TreatmentPlanForm/reducer';

type TreatmentServiceModalProps = {
  showTreatmentServiceModal: boolean;
  setShowTreatmentServiceModal: Dispatch<SetStateAction<boolean>>;
  ownerId?: number | null;
  dispatch?: Dispatch<ActionProps>;
};

type Inputs = {
  service_title: string;
  service_price: string;
};

const TreatmentServiceModal: React.FC<TreatmentServiceModalProps> = ({
  showTreatmentServiceModal,
  setShowTreatmentServiceModal,
  ownerId,
  dispatch,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({
    defaultValues: {
      service_price: '',
      service_title: '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch &&
      dispatch({
        type: 'add-service',
        payload: {
          owner: ownerId,
          title: data.service_title,
          price: Number(data.service_price.replace(/\D/g, '')),
        },
      });

    setShowTreatmentServiceModal(false);
  };

  return (
    <Modal
      showModal={showTreatmentServiceModal}
      setShowModal={setShowTreatmentServiceModal}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl"
      >
        <div className="flex flex-col items-center justify-center gap-4 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <h1 className="text-pucci-500 text-2xl font-bold">Incluir serviço</h1>
          <label htmlFor="service-title" className="flex flex-col gap-2 w-full">
            <strong className="text-start text-pucci-500 text-xs">
              Título do serviço
            </strong>
            <input
              type="text"
              placeholder="Título do serviço"
              className="text-gray-600 w-full p-2 border-2 border-pucci-100 rounded"
              {...register('service_title')}
            />
          </label>
          <label htmlFor="service-price" className="flex flex-col gap-2 w-full">
            <strong className="text-start text-pucci-500 text-xs">
              Preço do serviço
            </strong>
            <input
              type="tel"
              inputMode="numeric"
              className="text-gray-600 w-full p-2 border-2 border-pucci-100 rounded"
              placeholder="R$ 1.500,00"
              {...register('service_price', {
                onChange: (event) => {
                  const { value } = event.target;
                  event.target.value = priceMask(value);
                },
              })}
            />
          </label>
          <div id="buttons" className="flex gap-2 font-medium">
            <button
              className="bg-gray-400 hover:bg-gray-600 transition-colors py-2 px-4 rounded"
              onClick={() => setShowTreatmentServiceModal(false)}
            >
              Cancelar
            </button>
            <button
              disabled={!isValid}
              type="submit"
              className="bg-green-500 hover:bg-green-800 transition-colors py-2 px-4 rounded disabled:bg-gray-400"
            >
              Incluir serviço
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export function useTreatmentServiceModal(dispatch: Dispatch<ActionProps>) {
  const [showTreatmentServiceModal, setShowTreatmentServiceModal] =
    useState(false);

  const [ownerId, setOwnerId] = useState<number | null>(null);

  const TreatmentServiceModalCallback = useCallback(() => {
    return (
      <TreatmentServiceModal
        showTreatmentServiceModal={showTreatmentServiceModal}
        setShowTreatmentServiceModal={setShowTreatmentServiceModal}
        ownerId={ownerId}
        dispatch={dispatch}
      />
    );
  }, [
    showTreatmentServiceModal,
    setShowTreatmentServiceModal,
    ownerId,
    dispatch,
  ]);

  return useMemo(
    () => ({
      setShowTreatmentServiceModal,
      setOwnerId,
      TreatmentServiceModal: TreatmentServiceModalCallback,
    }),
    [setShowTreatmentServiceModal, TreatmentServiceModalCallback]
  );
}
