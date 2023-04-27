import { v4 as uuidv4 } from 'uuid';

export type Service = {
  id: string;
  owner: number;
  title: string;
  price: number;
};

type Selected = {
  id: number | null;
  services: Service[];
};

type StateProps = {
  selected: Selected;
  mapServices: Service[];
  total: number;
};

export type ActionProps = {
  type: 'selected' | 'add-service' | 'remove-service';
  payload: any;
};

export default function reducer(state: StateProps, action: ActionProps) {
  switch (action.type) {
    case 'selected': {
      return {
        ...state,
        selected: {
          id: action.payload.id,
          services: state.mapServices.filter(
            (item) => item.owner === action.payload.id
          ),
        },
      };
    }
    case 'add-service': {
      const newService = {
        id: uuidv4(),
        owner: action.payload.owner,
        title: action.payload.title,
        price: action.payload.price,
      };
      return {
        ...state,
        mapServices: [...state.mapServices, newService],
        selected: {
          ...state.selected,
          services: [...state.selected.services, newService],
        },
        total: state.mapServices.reduce(
          (acc, current) => acc + current.price,
          action.payload.price
        ),
      };
    }
    case 'remove-service': {
      return {
        ...state,
        mapServices: state.mapServices.filter(
          (item) => item.id !== action.payload.serviceId
        ),
        selected: {
          ...state.selected,
          services: state.selected.services.filter(
            (item) => item.id !== action.payload.serviceId
          ),
        },
        total: state.mapServices
          .filter((item) => item.id !== action.payload.serviceId)
          .reduce((acc, current) => acc + current.price, 0),
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
