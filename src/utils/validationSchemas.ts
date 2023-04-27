import {
  colorScale,
  toothMapColorScale,
} from '@/app/dashboard/orders/components/NewOrderForm/constants';

import * as yup from 'yup';

export const newOrderSchema = yup
  .object()
  .shape({
    customer_name: yup.string().required('nome é obrigatório'),
    customer_age: yup
      .number()
      .min(1, 'Idade mínima de 1 ano')
      .required('idade é obrigatória'),
    customer_phone: yup
      .string()
      .matches(
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\s?\d|[2-9])\d{3})\-?(\d{4}))$/,
        {
          message: 'formato 5511999999999',
        }
      )
      .required('telefone é obrigatório'),
    customer_sex: yup
      .string()
      .oneOf(['M', 'F'], 'apenas M e F permitidos')
      .required('sexo é obrigatório'),
    service_title: yup
      .string()
      .uuid('tipo de trabalho é obrigatório')
      .required('tipo de trabalho é obrigatório'),
    // Verifica, através da categoria, se materiais são obrigatórios
    service_material: yup.string().when('service_category', {
      is: (val: string) => {
        return val !== 'Outros' && val !== 'DEFAULT';
      },
      then: (schema) =>
        schema.required().notOneOf(['DEFAULT'], 'Material obrigatório'),
    }),
    service_deadline: yup
      .date()
      // Essa linha verifica se a data é, pelo menos, D + 1
      .min(
        new Date(
          new Date().setDate(new Date().getDate() + 1)
        ).toLocaleDateString(),
        'Apenas datas futuras'
      )
      .required('Data obrigatória'),
    service_deadline_period: yup
      .string()
      .oneOf(['M', 'T'], 'manhã ou tarde obrigatório')
      .required('Período de entrega obrigatório'),
    service_final_status: yup
      .string()
      .oneOf(['S', 'N'], 'sim ou não obrigatório')
      .required('finalizado obrigatório'),
    service_prepare_color: yup
      .string()
      .oneOf([...colorScale], 'Apenas cores disponíveis na paleta')
      .required('cor preparo obrigatória')
      .typeError('cor preparo obrigatória'),
    service_final_color: yup
      .string()
      .oneOf([...colorScale], 'Apenas cores disponíveis na paleta')
      .required('cor preparo obrigatória')
      .typeError('cor preparo obrigatória'),
    // Ajustar com escala nova
    service_gum_color: yup
      .number()
      .transform((value, originalValue) => {
        if (originalValue === 'DEFAULT') {
          return 0;
        }
        return value;
      })
      .min(0, 'Apenas cores disponíveis na paleta')
      .max(5, 'Apenas cores disponíveis na paleta'),
    // .typeError('cor gengiva obrigatória'),
    odgm_result: yup
      .array()
      .of(yup.number().min(11).max(48).required('Ao menos um item obrigatório'))
      .min(1, 'Ao menos um item obrigatório'),
    map1_result: yup
      .array()
      .of(
        yup
          .string()
          .oneOf(
            [...toothMapColorScale, 'DEFAULT'],
            'Apenas cores disponíveis na paleta'
          )
      ),
    map2_result: yup
      .array()
      .of(
        yup
          .string()
          .oneOf(
            [...toothMapColorScale, 'DEFAULT'],
            'Apenas cores disponíveis na paleta'
          )
      ),
    antagonista: yup.number().min(0, 'Números negativos não permitidos'),
    componentes: yup.number().min(0, 'Números negativos não permitidos'),
    modelo_trabalho: yup.number().min(0, 'Números negativos não permitidos'),
    moldeira: yup.number().min(0, 'Números negativos não permitidos'),
    relacionamento_oclusao: yup
      .number()
      .min(0, 'Números negativos não permitidos'),
    outros: yup.number().min(0, 'Números negativos não permitidos'),
    aditional_info: yup.string(),
  })
  .required();
