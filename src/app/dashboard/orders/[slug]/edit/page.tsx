import React from 'react';
import EditOrderForm from '@/app/dashboard/orders/components/EditOrderForm';

type EditOrderProps = {
  params: {
    slug: string;
  };
};

const EditOrder: React.FC<EditOrderProps> = ({ params }) => {
  return (
    <div className="w-full flex flex-col gap-2 relative">
      <EditOrderForm edit={false} params={params} />
    </div>
  );
};

export default EditOrder;
