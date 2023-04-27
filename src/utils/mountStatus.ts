export type MountedStatus = {
  style: string;
  text:
    | 'ENVIADO'
    | 'CONFIRMADO'
    | 'CANCELADO'
    | 'PENDENTE'
    | 'ATRASADO'
    | 'FINALIZADO';
};

export const mountStatus = (status: number): MountedStatus => {
  switch (status) {
    case 0:
      return {
        style: 'bg-blue-500',
        text: 'ENVIADO',
      };
    case 1:
      return {
        style: 'bg-green-500',
        text: 'CONFIRMADO',
      };
    case 2:
      return {
        style: 'bg-red-500',
        text: 'CANCELADO',
      };
    case 3:
      return {
        style: 'bg-yellow-500',
        text: 'PENDENTE',
      };
    case 4:
      return {
        style: 'bg-fuchsia-500',
        text: 'ATRASADO',
      };
    case 5:
      return {
        style: 'bg-pucci-500',
        text: 'FINALIZADO',
      };
    default:
      return {
        style: 'bg-blue-500',
        text: 'ENVIADO',
      };
  }
};
