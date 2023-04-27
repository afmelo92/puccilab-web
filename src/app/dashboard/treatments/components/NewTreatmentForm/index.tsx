'use client';

import { cellphoneMask, cepMask, cpfMask } from '@/utils';
import Icon from '@/utils/getIcon';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TreatmentPlanForm from '../TreatmentPlanForm';
import { civilStatus, country_states } from './constants';

type Patient = {
  uid: string;
  name: string;
  age: number;
  sex: 'M' | 'F';
  address: string;
  country: string;
  state: (typeof country_states)[number]['uf'];
  city: string;
  zip: string;
  phone: string | null;
  cellphone: string;
  rg: string;
  exp_org: string;
  cpf: string;
  civ_status: number;
  birth_date: string;
  profession: string;
  email: string;
  taking_medicine: boolean;
  taking_medicine_description: string | null;
  medical_treatment: boolean;
  medical_treatment_description: string | null;
  has_allergy: 'YES' | 'NO' | 'MAYBE';
  has_allergy_description: string | null;
  blood_pressure: 'NORMAL' | 'HIGH' | 'LOW' | 'CONTROLLED';
  blood_pressure_description: string | null;
  heart_problems: boolean;
  heart_problems_description: string | null;
  rheumatic_fever: boolean;
  has_diabetes: 'YES' | 'NO' | 'MAYBE';
  bleeding: 'NORMAL' | 'EXCESSIVE';
  healing: 'NORMAL' | 'SLOW';
  hepatitis: boolean;
  breathing_problems: boolean;
  gastric_problems: boolean;
  joint_problems: boolean;
  hiv: boolean;
  anesthesia_reaction: boolean;
  anesthesia_reaction_description: string | null;
  teeth_gum_pain: boolean;
  gum_bleeding: 'YES' | 'NO' | 'HYGIENE' | 'SOMETMES';
  ear_pain: boolean;
  mouth_pain: boolean;
  bruxism: boolean;
  smoke: boolean;
  alcohol: boolean;
  pregnant_breastfeeding: boolean;
  another_info: boolean;
  another_info_description: string | null;
};

type Patients = Patient[];

type Inputs = {
  db_patients: Patients;
  patient_uid?: string | null;
  patient_name: string | null;
  patient_age: number | null;
  patient_sex: 'M' | 'F' | null;
  patient_address: string | null;
  patient_country: string | null;
  patient_state: (typeof country_states)[number]['uf'] | null;
  patient_city: string | null;
  patient_zip: string | null;
  patient_phone: string | null;
  patient_cellphone: string | null;
  patient_rg: string | null;
  patient_exp_org: string | null;
  patient_cpf: string | null;
  patient_birth_date: string | null;
  patient_civ_status: number | null;
  patient_profession: string | null;
  patient_email: string | null;
  taking_medicine: number;
  taking_medicine_description: string | null;
  medical_treatment: number;
  medical_treatment_description: string | null;
  has_allergy: number;
  has_allergy_description: string | null;
  blood_pressure: number;
  blood_pressure_description: string | null;
  heart_problems: number;
  heart_problems_description: string | null;
  rheumatic_fever: number;
  has_diabetes: number;
  bleeding: number;
  healing: number;
  hepatitis: number;
  breathing_problems: number;
  gastric_problems: number;
  joint_problems: number;
  hiv: number;
  anesthesia_reaction: number;
  anesthesia_reaction_description: string | null;
  teeth_gum_pain: number;
  gum_bleeding: number;
  ear_pain: number;
  mouth_pain: number;
  bruxism: number;
  smoke: number;
  alcohol: number;
  pregnant_breastfeeding: number;
  another_info: number;
  another_info_description: string | null;
  description: string | null;
};

const NewTreatmentForm: React.FC = () => {
  const { data: session } = useSession();
  const [dbPatientsVisible, setDbPatientsVisible] = useState(false);
  const [stage, setStage] = useState(1);
  const dbPatientsRef = useRef<HTMLSelectElement>(null);

  const patients = useQuery<Patients | [], Error>({
    queryKey: ['patients', session],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/patients`, {
        headers: { Authorization: `Bearer ${session?.user.accessToken}` },
      });

      if (response.status === 401 || response.status === 403) {
        throw new Error('Unauthorized');
      }

      // if (response.ok) {
      //   const parsed = await response.json();

      //   return parsed.data;
      // }

      return [
        {
          uid: '1',
          name: 'Andre Fabian Duarte Melo',
          age: 31,
          sex: 'M',
          address: 'R Ciro Melo 1115',
          phone: null,
          cellphone: '5541999013657',
          country: 'BR',
          state: 'MS',
          city: 'Dourados',
          zip: '79801001',
          rg: '401101629',
          exp_org: 'SSP',
          cpf: '00759434255',
          birth_date: '1992-03-06T03:00:00.000Z',
          civ_status: 2,
          profession: 'Programador',
          email: 'andre.fabian.melo@gmail.com',
          taking_medicine: false,
          taking_medicine_description: null,
          medical_treatment: false,
          medical_treatment_description: null,
          has_allergy: 'NO',
          has_allergy_description: null,
          blood_pressure: 'NORMAL',
          blood_pressure_description: null,
          heart_problems: false,
          heart_problems_description: null,
          rheumatic_fever: false,
          has_diabetes: 'NO',
          bleeding: 'NORMAL',
          healing: 'NORMAL',
          hepatitis: false,
          breathing_problems: false,
          gastric_problems: false,
          joint_problems: false,
          hiv: false,
          anesthesia_reaction: false,
          anesthesia_reaction_description: null,
          teeth_gum_pain: false,
          gum_bleeding: 'NO',
          ear_pain: false,
          mouth_pain: false,
          bruxism: false,
          smoke: false,
          alcohol: false,
          pregnant_breastfeeding: false,
          another_info: false,
          another_info_description: null,
        },
        {
          uid: '2',
          name: 'Raphael Almeida SeuCreyson',
          age: 35,
          sex: 'F',
          address: 'R dos bobos 0',
          phone: null,
          cellphone: '5565999881122',
          country: 'BR',
          state: 'GO',
          city: 'Goiania',
          zip: '85401777',
          rg: '302202730',
          exp_org: 'SSP',
          cpf: '00759434255',
          birth_date: '1989-06-17T03:00:00.000Z',
          civ_status: 5,
          profession: 'Mega empresário',
          email: 'creyson@gmail.com',
          taking_medicine: true,
          taking_medicine_description: 'Fluconazol',
          medical_treatment: true,
          medical_treatment_description: 'HIV em estágio avançado',
          has_allergy: 'YES',
          has_allergy_description: 'Mulheres',
          blood_pressure: 'CONTROLLED',
          blood_pressure_description: 'Antidepressivos fortes',
          heart_problems: true,
          heart_problems_description: 'Sopro cardíaco e ponte de safena',
          rheumatic_fever: true,
          has_diabetes: 'YES',
          bleeding: 'EXCESSIVE',
          healing: 'SLOW',
          hepatitis: true,
          breathing_problems: true,
          gastric_problems: true,
          joint_problems: true,
          hiv: true,
          anesthesia_reaction: true,
          anesthesia_reaction_description: 'A garganta fechou, a cara inchou',
          teeth_gum_pain: true,
          gum_bleeding: 'YES',
          ear_pain: true,
          mouth_pain: true,
          bruxism: true,
          smoke: true,
          alcohol: true,
          pregnant_breastfeeding: true,
          another_info: true,
          another_info_description:
            'Sou um trans zoofilo com pitadas de necrofilia e ainda por cima gosto de ser corno',
        },
      ];
    },
    onSuccess: () => {
      console.log('FETCH PATIENTS');
    },
    initialData: [],
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const {
    register,
    setValue,
    watch,
    formState: { isValid },
    reset,
    handleSubmit,
  } = useForm<Inputs>({
    values: {
      db_patients: patients.data,
      patient_uid: null,
      patient_name: null,
      patient_age: null,
      patient_sex: null,
      patient_address: null,
      patient_phone: null,
      patient_cellphone: null,
      patient_country: 'Brasil',
      patient_state: null,
      patient_city: null,
      patient_zip: null,
      patient_rg: null,
      patient_exp_org: null,
      patient_cpf: null,
      patient_birth_date: null,
      patient_civ_status: null,
      patient_profession: null,
      patient_email: null,
      taking_medicine: 0,
      taking_medicine_description: null,
      medical_treatment: 0,
      medical_treatment_description: null,
      has_allergy: 0,
      has_allergy_description: null,
      blood_pressure: 0,
      blood_pressure_description: null,
      heart_problems: 0,
      heart_problems_description: null,
      rheumatic_fever: 0,
      has_diabetes: 0,
      bleeding: 1,
      healing: 1,
      hepatitis: 0,
      breathing_problems: 0,
      gastric_problems: 0,
      joint_problems: 0,
      hiv: 0,
      anesthesia_reaction: 0,
      anesthesia_reaction_description: null,
      teeth_gum_pain: 0,
      gum_bleeding: 1,
      ear_pain: 0,
      mouth_pain: 0,
      bruxism: 0,
      smoke: 0,
      alcohol: 0,
      pregnant_breastfeeding: 0,
      another_info: 0,
      another_info_description: null,
      description: null,
    },
  });

  function handleSelectPatient(e: React.ChangeEvent<HTMLSelectElement>) {
    setDbPatientsVisible(false);
    const selected = patients.data.find(
      (item) => String(item.uid) === e.target.value
    );

    if (selected) {
      setValue('patient_uid', selected.uid);
      setValue('patient_name', selected.name);
      setValue('patient_age', selected.age);
      setValue('patient_sex', selected.sex);
      setValue('patient_address', selected.address);
      setValue('patient_country', selected.country);
      setValue('patient_state', selected.state);
      setValue('patient_city', selected.city);
      setValue('patient_phone', cellphoneMask(selected?.phone || ''));
      setValue('patient_cellphone', cellphoneMask(selected.cellphone));
      setValue('patient_state', selected.state);
      setValue('patient_city', selected.city);
      setValue('patient_zip', cepMask(selected.zip));
      setValue('patient_rg', selected.rg);
      setValue('patient_exp_org', selected.exp_org);
      setValue('patient_cpf', cpfMask(selected.cpf));
      setValue(
        'patient_birth_date',
        new Date(selected.birth_date).toISOString().split('T')[0]
      );
      setValue('patient_civ_status', selected.civ_status);
      setValue('patient_profession', selected.profession);
      setValue('patient_email', selected.email);
      setValue('taking_medicine', Number(selected.taking_medicine));
      setValue(
        'taking_medicine_description',
        selected.taking_medicine_description
      );
      setValue('medical_treatment', Number(selected.medical_treatment));
      setValue(
        'medical_treatment_description',
        selected.medical_treatment_description
      );
      setValue(
        'has_allergy',
        selected.has_allergy === 'YES'
          ? 1
          : selected.has_allergy === 'NO'
          ? 0
          : 2
      );
      setValue('has_allergy_description', selected.has_allergy_description);
      setValue(
        'blood_pressure',
        selected.blood_pressure === 'NORMAL'
          ? 0
          : selected.blood_pressure === 'HIGH'
          ? 1
          : selected.blood_pressure === 'LOW'
          ? 2
          : 3
      );
      setValue(
        'blood_pressure_description',
        selected.blood_pressure_description
      );
      setValue('heart_problems', selected.heart_problems ? 1 : 0);
      setValue(
        'heart_problems_description',
        selected.heart_problems_description
      );
      setValue('rheumatic_fever', Number(selected.rheumatic_fever));
      setValue(
        'has_diabetes',
        selected.has_diabetes === 'YES'
          ? 1
          : selected.has_diabetes === 'NO'
          ? 0
          : 2
      );
      setValue('bleeding', selected.bleeding === 'NORMAL' ? 1 : 0);
      setValue('healing', selected.healing === 'NORMAL' ? 1 : 0);
      setValue('hepatitis', Number(selected.hepatitis));
      setValue('breathing_problems', Number(selected.breathing_problems));
      setValue('gastric_problems', Number(selected.gastric_problems));
      setValue('joint_problems', Number(selected.joint_problems));
      setValue('hiv', Number(selected.hiv));
      setValue('anesthesia_reaction', Number(selected.anesthesia_reaction));
      setValue(
        'anesthesia_reaction_description',
        selected.anesthesia_reaction_description
      );
      setValue('teeth_gum_pain', Number(selected.teeth_gum_pain));
      setValue(
        'gum_bleeding',
        selected.gum_bleeding === 'YES'
          ? 0
          : selected.gum_bleeding === 'NO'
          ? 1
          : selected.gum_bleeding === 'HYGIENE'
          ? 2
          : 3
      );
      setValue('ear_pain', Number(selected.ear_pain));
      setValue('mouth_pain', Number(selected.mouth_pain));
      setValue('bruxism', Number(selected.bruxism));
      setValue('smoke', Number(selected.smoke));
      setValue('alcohol', Number(selected.alcohol));
      setValue(
        'pregnant_breastfeeding',
        Number(selected.pregnant_breastfeeding)
      );
      setValue('another_info', Number(selected.another_info));
      setValue('another_info_description', selected.another_info_description);
    }
  }

  function handleBlur() {
    setDbPatientsVisible(false);
  }

  async function handleRegisteredPatients() {
    await patients.refetch();
    setDbPatientsVisible(true);
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    for (const key in data) {
      switch (key) {
        case 'alcohol':
        case 'anesthesia_reaction':
        case 'another_info':
        case 'bleeding':
        case 'blood_pressure':
        case 'breathing_problems':
        case 'bruxism':
        case 'ear_pain':
        case 'gastric_problems':
        case 'gum_bleeding':
        case 'has_allergy':
        case 'has_diabetes':
        case 'healing':
        case 'heart_problems':
        case 'hepatitis':
        case 'hiv':
        case 'joint_problems':
        case 'medical_treatment':
        case 'mouth_pain':
        case 'patient_age':
        case 'patient_civ_status':
        case 'pregnant_breastfeeding':
        case 'rheumatic_fever':
        case 'smoke':
        case 'taking_medicine':
        case 'teeth_gum_pain':
          data[key] = Number(data[key]);
          break;
        case 'patient_birth_date':
          if (data[key]) {
            data[key] = new Date(data[key] as string).toISOString();
          }
          break;
        default:
          break;
      }
    }

    console.log({ data });

    setStage(2);
  };

  return (
    <section className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="w-full flex gap-2">
        <div
          id="header"
          className="bg-pucci-500 w-full h-16 rounded flex items-center justify-between px-4 sticky top-0"
        >
          <div className="flex items-center justify-center gap-4">
            <Link href="/dashboard/treatments" title="Voltar aos tratamentos">
              <Icon
                name="back"
                className="w-8 h-8 p-1 rounded stroke-white hover:bg-pucci-300 transition-colors"
              />
            </Link>

            <p className="text-lg text-white font-semibold z-20">
              Novo Tratamento
            </p>
          </div>

          <div className="flex gap-2 justify-self-end">
            <p
              className={`${
                stage === 1 ? 'bg-pucci-300' : 'bg-gray-400'
              } rounded font-medium  p-2 cursor-pointer`}
              onClick={() => setStage(1)}
            >
              Anamnese
            </p>
            <p
              className={`${
                stage === 2 ? 'bg-pucci-300' : 'bg-gray-400'
              } rounded font-medium p-2 cursor-pointer`}
              onClick={() => setStage(2)}
            >
              Plano de tratamento
            </p>
          </div>
        </div>
      </div>

      {/* FORM STAGE 1 */}
      {stage === 1 ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 grid-rows-3 gap-2 h-full"
        >
          {/* Dados paciente */}
          <fieldset
            id="patient-data"
            className="w-full flex flex-col gap-4 bg-fuchsia-200 rounded p-4 row-span-3 relative"
          >
            <button
              type="button"
              className="z-10 bg-blue-500 hover:bg-blue-700 w-fit p-2 text-xs rounded top-0 right-4 absolute"
              onClick={() => reset()}
            >
              Resetar formulário
            </button>
            <legend className="font-bold text-pucci-500 text-sm">
              Dados do paciente
            </legend>
            {/* ROW 1 */}
            <div id="row-1" className="grid grid-cols-4 grid-rows-1 gap-2">
              <div id="input_patient_name" className="w-full col-span-4">
                <label
                  htmlFor="patient_name"
                  className="flex flex-col gap-1 relative"
                >
                  <strong className="text-pucci-500 text-xs ">
                    Nome completo
                  </strong>
                  <input
                    type="text"
                    id="patient_name"
                    className=" p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="Nome completo"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_name')}
                  />
                  {!watch('patient_name') && (
                    <button
                      type="button"
                      className={`${
                        dbPatientsVisible
                          ? 'top-1/4'
                          : 'top-1/2 -translate-y-[21%]'
                      } absolute bg-pucci-500 p-2 rounded text-xs  right-2`}
                      onClick={handleRegisteredPatients}
                    >
                      Paciente já cadastrado?
                    </button>
                  )}

                  {!watch('patient_name') && (
                    <div
                      className={`text-black bg-white w-full
                   rounded relative ${dbPatientsVisible ? 'block' : 'hidden'}`}
                      onBlur={handleBlur}
                      onClick={() => dbPatientsRef.current?.click()}
                    >
                      <select
                        className="w-full bg-white p-2 stroke-pucci-500 cursor-pointer text-pucci-500"
                        {...register('db_patients')}
                        onChange={(e) => handleSelectPatient(e)}
                        placeholder="Selecione o paciente"
                        ref={dbPatientsRef}
                      >
                        <option value="" hidden>
                          Clique e selecione o paciente
                        </option>
                        {patients.data.map((item) => (
                          <option
                            key={item.uid}
                            value={item.uid}
                            className="text-gray-900"
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 2 */}
            <div
              id="row-2"
              className="grid grid-cols-2 grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 gap-2"
            >
              <div id="input_patient_age" className="w-full">
                <label htmlFor="patient_age" className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">Idade</strong>
                  <input
                    type="number"
                    id="patient_age"
                    className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="Idade"
                    autoComplete="none"
                    autoCorrect="none"
                    // disabled={mutationLoading}
                    {...register('patient_age', {
                      min: 1,
                    })}
                  />
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="customer_age"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>

              <div id="input_patient_sex" className="w-full">
                <label
                  htmlFor="patient_sex"
                  className="flex h-full flex-col gap-1"
                >
                  <strong className="text-pucci-500 text-xs">Sexo</strong>
                  <select
                    id="patient_sex"
                    className="text-sm p-3 rounded bg-white text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    // disabled={mutationLoading}
                    {...register('patient_sex')}
                  >
                    <option value={'M'}>Masculino</option>
                    <option value={'F'}>Feminino</option>
                  </select>
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="patient_sex"
              render={({ message }) => (
                <small className="text-red-500 tex-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>

              <div id="input_patient_civ_status" className="w-full">
                <label
                  htmlFor="patient_civ_status"
                  className="flex flex-col gap-1"
                >
                  <strong className="text-pucci-500 text-xs">
                    Estado civil
                  </strong>
                  <select
                    id="patient_civ_status"
                    className="p-3 rounded text-sm bg-white text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="Estado civil"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_civ_status')}
                  >
                    {civilStatus.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.text}
                      </option>
                    ))}
                  </select>
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="patient_cellphone"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>

              <div id="input_patient_birth_date" className="w-full">
                <label
                  htmlFor="patient_birth_date"
                  className="flex flex-col gap-1"
                >
                  <strong className="text-pucci-500 text-xs">
                    Data de nascimento
                  </strong>
                  <input
                    type="date"
                    id="patient_birth_date"
                    className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="Data de nascimento"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_birth_date')}
                  />
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 3 */}
            <div id="row-3" className="grid grid-cols-4 grid-rows-1">
              <div id="input_patient_address" className="w-full col-span-4">
                <label
                  htmlFor="patient_address"
                  className="flex flex-col gap-1"
                >
                  <strong className="text-pucci-500 text-xs">Endereço</strong>
                  <input
                    type="text"
                    id="patient_address"
                    className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="Endereço"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_address')}
                  />
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 4 */}
            <div
              id="row-4"
              className="grid grid-cols-2 grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 gap-2"
            >
              <div id="input_patient_country" className="w-full">
                <label
                  htmlFor="patient_country"
                  className="flex flex-col gap-1"
                >
                  <strong className="text-pucci-500 text-xs">País</strong>
                  <input
                    disabled
                    type="text"
                    id="patient_country"
                    className="p-3 rounded text-sm text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="País"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_country')}
                  />
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="patient_country"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>

              <div id="input_patient_state" className="w-full">
                <label htmlFor="patient_state" className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">Estado</strong>
                  <select
                    id="patient_state"
                    className="p-3 rounded text-sm bg-white text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="Estado"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_state')}
                  >
                    {country_states.map((state) => (
                      <option key={state.uf} value={state.uf}>
                        {state.uf}
                      </option>
                    ))}
                  </select>
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="patient_state"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>

              <div id="input_patient_city" className="w-full">
                <label htmlFor="patient_city" className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">Cidade</strong>
                  <input
                    type="text"
                    id="patient_city"
                    className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="Cidade"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_city', {
                      onChange: (event) => {
                        event.target.value = event.target.value.replace(
                          /\d/g,
                          ''
                        );
                      },
                    })}
                  />
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>

              <div id="input_patient_zip" className="w-full">
                <label htmlFor="patient_zip" className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">CEP</strong>
                  <input
                    type="text"
                    id="patient_zip"
                    className="p-3 rounded text-sm text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="00000-000"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_zip', {
                      onChange: (event) => {
                        const { value } = event.target;

                        event.target.value = cepMask(value);
                      },
                    })}
                  />
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="patient_phone"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 5 */}
            <div
              id="row-5"
              className="grid grid-cols-2 grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 gap-2"
            >
              <div id="input_patient_phone" className="w-full">
                <label htmlFor="patient_phone" className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">Telefone</strong>
                  <input
                    type="text"
                    id="patient_phone"
                    className="p-3 rounded text-sm text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="Telefone"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_phone', {
                      onChange: (event) => {
                        const { value } = event.target;

                        event.target.value = cellphoneMask(value);
                      },
                    })}
                  />
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="patient_phone"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>

              <div id="input_patient_cellphone" className="w-full">
                <label
                  htmlFor="patient_cellphone"
                  className="flex flex-col gap-1"
                >
                  <strong className="text-pucci-500 text-xs">Celular</strong>
                  <input
                    type="text"
                    id="patient_cellphone"
                    className="p-3 rounded text-sm text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="Celular"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_cellphone', {
                      onChange: (event) => {
                        const { value } = event.target;

                        event.target.value = cellphoneMask(value);
                      },
                    })}
                  />
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="patient_cellphone"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>

              <div id="input_patient_rg" className="w-full">
                <label htmlFor="patient_rg" className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">RG</strong>
                  <input
                    type="text"
                    id="patient_rg"
                    className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="RG"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_rg', {
                      onChange: (event) => {
                        event.target.value = event.target.value.replace(
                          /\D/g,
                          ''
                        );
                      },
                    })}
                  />
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>

              <div id="input_patient_exp_org" className="w-full">
                <label
                  htmlFor="patient_exp_org"
                  className="flex flex-col gap-1"
                >
                  <strong className="text-pucci-500 text-xs">
                    Orgão expedidor
                  </strong>
                  <input
                    type="text"
                    id="patient_exp_org"
                    className="p-3 rounded text-sm text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="Orgão expedidor"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_exp_org', {
                      onChange: (event) => {
                        event.target.value = event.target.value.replace(
                          /\d/g,
                          ''
                        );
                      },
                    })}
                  />
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="patient_phone"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 4 */}
            <div
              id="row-4"
              className="grid grid-cols-4 grid-rows-2 xl:grid-rows-1 gap-2"
            >
              <div
                id="input_patient_cpf"
                className="w-full col-span-2 lg:col-span-1"
              >
                <label htmlFor="patient_cpf" className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">CPF</strong>
                  <input
                    type="text"
                    id="patient_cpf"
                    className="p-3 rounded text-sm text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="000.000.000-00"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_cpf', {
                      onChange: (event) => {
                        const { value }: { value: string } = event.target;

                        event.target.value = cpfMask(value);
                      },
                    })}
                  />
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="patient_phone"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>

              <div
                id="input_patient_profession"
                className="w-full col-span-2 lg:col-span-1"
              >
                <label
                  htmlFor="patient_profession"
                  className="flex flex-col gap-1"
                >
                  <strong className="text-pucci-500 text-xs">Profissão</strong>
                  <input
                    type="text"
                    id="patient_profession"
                    className="p-3 rounded text-sm text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="Profissão"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_profession')}
                  />
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="patient_phone"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>

              <div
                id="input_patient_email"
                className="w-full col-span-4 lg:col-span-2"
              >
                <label htmlFor="patient_email" className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">E-mail</strong>
                  <input
                    type="email"
                    id="patient_email"
                    className="p-3 rounded text-sm text-slate-600 focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    placeholder="E-mail"
                    // disabled={mutationLoading}
                    autoComplete="none"
                    autoCorrect="none"
                    {...register('patient_email')}
                  />
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="patient_phone"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>
          </fieldset>

          {/* Anamnese */}
          <fieldset
            id="patient-data"
            className="w-full flex flex-col gap-4 bg-fuchsia-200 rounded p-4 row-span-3 max-h-[calc(100vh-242px)] overflow-y-auto"
          >
            <legend className="font-bold text-pucci-500 text-sm">
              Anamnese
            </legend>

            {/* ROW 1 */}
            <div id="row-1" className="flex flex-col gap-2">
              <div id="taking_medicine_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Está tomando algum remédio?
                  </strong>
                  <div
                    id="taking_medicine_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="taking_medicine_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="taking_medicine_input_y"
                        value={1}
                        checked={Number(watch('taking_medicine')) === 1}
                        {...register('taking_medicine')}
                      />
                      <label
                        htmlFor="taking_medicine_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="taking_medicine_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="taking_medicine_input_n"
                        value={0}
                        checked={Number(watch('taking_medicine')) === 0}
                        {...register('taking_medicine')}
                      />
                      <label
                        htmlFor="taking_medicine_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                  {!!Number(watch('taking_medicine')) && (
                    <input
                      type="text"
                      id="taking_medicine_description"
                      className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      placeholder="Qual?"
                      // disabled={mutationLoading}
                      autoComplete="none"
                      autoCorrect="none"
                      {...register('taking_medicine_description')}
                    />
                  )}
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 2 */}
            <div id="row-2" className="flex flex-col gap-2">
              <div id="medical_treatment_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Está em tratamento médico?
                  </strong>
                  <div
                    id="medical_treatment_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="medical_treatment_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="medical_treatment_input_y"
                        value={1}
                        checked={Number(watch('medical_treatment')) === 1}
                        {...register('medical_treatment')}
                      />
                      <label
                        htmlFor="medical_treatment_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="medical_treatment_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="medical_treatment_input_n"
                        value={0}
                        checked={Number(watch('medical_treatment')) === 0}
                        {...register('medical_treatment')}
                      />
                      <label
                        htmlFor="medical_treatment_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                  {!!Number(watch('medical_treatment')) && (
                    <input
                      type="text"
                      id="medical_treatment_description"
                      className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      placeholder="Qual?"
                      // disabled={mutationLoading}
                      autoComplete="none"
                      autoCorrect="none"
                      {...register('medical_treatment_description')}
                    />
                  )}
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 3 */}
            <div id="row-3" className="flex flex-col gap-2">
              <div id="has_allergy_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Tem alguma alergia?
                  </strong>
                  <div
                    id="has_allergy_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="has_allergy_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="has_allergy_input_y"
                        value={1}
                        checked={Number(watch('has_allergy')) === 1}
                        {...register('has_allergy')}
                      />
                      <label
                        htmlFor="has_allergy_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="has_allergy_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="has_allergy_input_n"
                        value={0}
                        checked={Number(watch('has_allergy')) === 0}
                        {...register('has_allergy')}
                      />
                      <label
                        htmlFor="has_allergy_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                    <div id="has_allergy_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="has_allergy_input_maybe"
                        value={2}
                        checked={Number(watch('has_allergy')) === 2}
                        {...register('has_allergy')}
                      />
                      <label
                        htmlFor="has_allergy_input_maybe"
                        className="text-sm font-medium"
                      >
                        Não sei
                      </label>
                    </div>
                  </div>
                  {Number(watch('has_allergy')) === 1 && (
                    <input
                      type="text"
                      id="has_allergy_description"
                      className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      placeholder="Quais?"
                      // disabled={mutationLoading}
                      autoComplete="none"
                      autoCorrect="none"
                      {...register('has_allergy_description')}
                    />
                  )}
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 4 */}
            <div id="row-4" className="flex flex-col gap-2">
              <div id="blood_pressure_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Sua pressão é:
                  </strong>
                  <div
                    id="blood_pressure_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="blood_pressure_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="blood_pressure_input_normal"
                        value={0}
                        checked={Number(watch('blood_pressure')) === 0}
                        {...register('blood_pressure')}
                      />
                      <label
                        htmlFor="blood_pressure_input_normal"
                        className="text-sm font-medium"
                      >
                        Normal
                      </label>
                    </div>
                    <div id="blood_pressure_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="blood_pressure_input_high"
                        value={1}
                        checked={Number(watch('blood_pressure')) === 1}
                        {...register('blood_pressure')}
                      />
                      <label
                        htmlFor="blood_pressure_input_high"
                        className="text-sm font-medium"
                      >
                        Alta
                      </label>
                    </div>
                    <div id="blood_pressure_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="blood_pressure_input_low"
                        value={2}
                        checked={Number(watch('blood_pressure')) === 2}
                        {...register('blood_pressure')}
                      />
                      <label
                        htmlFor="blood_pressure_input_low"
                        className="text-sm font-medium"
                      >
                        Baixa
                      </label>
                    </div>
                    <div id="blood_pressure_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="blood_pressure_input_controlled"
                        value={3}
                        checked={Number(watch('blood_pressure')) === 3}
                        {...register('blood_pressure')}
                      />
                      <label
                        htmlFor="blood_pressure_input_controlled"
                        className="text-sm font-medium"
                      >
                        Controlada com medicamento
                      </label>
                    </div>
                  </div>
                  {Number(watch('blood_pressure')) === 3 && (
                    <input
                      type="text"
                      id="blood_pressure_description"
                      className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      placeholder="Quais?"
                      // disabled={mutationLoading}
                      autoComplete="none"
                      autoCorrect="none"
                      {...register('blood_pressure_description')}
                    />
                  )}
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 5 */}
            <div id="row-5" className="flex flex-col gap-2">
              <div id="heart_problems_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Teve algum problema de coração?
                  </strong>
                  <div
                    id="heart_problems_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="heart_problems_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="heart_problems_input_y"
                        value={1}
                        checked={Number(watch('heart_problems')) === 1}
                        {...register('heart_problems')}
                      />
                      <label
                        htmlFor="heart_problems_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="heart_problems_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="heart_problems_input_n"
                        value={0}
                        checked={Number(watch('heart_problems')) === 0}
                        {...register('heart_problems')}
                      />
                      <label
                        htmlFor="heart_problems_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                  {Number(watch('heart_problems')) === 1 && (
                    <input
                      type="text"
                      id="heart_problems_description"
                      className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      placeholder="Quais?"
                      // disabled={mutationLoading}
                      autoComplete="none"
                      autoCorrect="none"
                      {...register('heart_problems_description')}
                    />
                  )}
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 6 */}
            <div id="row-6" className="flex flex-col gap-2">
              <div id="rheumatic_fever_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Tem ou teve febre reumática?
                  </strong>
                  <div
                    id="rheumatic_fever_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="rheumatic_fever_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="rheumatic_fever_input_y"
                        value={1}
                        checked={Number(watch('rheumatic_fever')) === 1}
                        {...register('rheumatic_fever')}
                      />
                      <label
                        htmlFor="rheumatic_fever_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="rheumatic_fever_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="rheumatic_fever_input_n"
                        value={0}
                        checked={Number(watch('rheumatic_fever')) === 0}
                        {...register('rheumatic_fever')}
                      />
                      <label
                        htmlFor="rheumatic_fever_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 7 */}
            <div id="row-7" className="flex flex-col gap-2">
              <div id="has_diabetes_input_block" className="w-full">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Tem diabetes?
                  </strong>
                  <div
                    id="has_diabetes_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="has_diabetes_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="has_diabetes_input_y"
                        value={1}
                        checked={Number(watch('has_diabetes')) === 1}
                        {...register('has_diabetes')}
                      />
                      <label
                        htmlFor="has_diabetes_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="has_diabetes_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="has_diabetes_input_n"
                        value={0}
                        checked={Number(watch('has_diabetes')) === 0}
                        {...register('has_diabetes')}
                      />
                      <label
                        htmlFor="has_diabetes_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                    <div id="has_diabetes_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="has_diabetes_input_maybe"
                        value={2}
                        checked={Number(watch('has_diabetes')) === 2}
                        {...register('has_diabetes')}
                      />
                      <label
                        htmlFor="has_diabetes_input_maybe"
                        className="text-sm font-medium"
                      >
                        Não sei
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 8 */}
            <div id="row-8" className="flex flex-col gap-2">
              <div id="bleeding_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Quando se corta há um sangramento
                  </strong>
                  <div
                    id="bleeding_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="bleeding_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="bleeding_input_normal"
                        value={1}
                        checked={Number(watch('bleeding')) === 1}
                        {...register('bleeding')}
                      />
                      <label
                        htmlFor="bleeding_input_normal"
                        className="text-sm font-medium"
                      >
                        Normal
                      </label>
                    </div>
                    <div id="bleeding_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="bleeding_input_excessive"
                        value={0}
                        checked={Number(watch('bleeding')) === 0}
                        {...register('bleeding')}
                      />
                      <label
                        htmlFor="bleeding_input_excessive"
                        className="text-sm font-medium"
                      >
                        Excessivo
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 9 */}
            <div id="row-9" className="flex flex-col gap-2">
              <div id="healing_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Sua cicatrização é:
                  </strong>
                  <div
                    id="healing_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="healing_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="healing_input_normal"
                        value={1}
                        checked={Number(watch('healing')) === 1}
                        {...register('healing')}
                      />
                      <label
                        htmlFor="healing_input_normal"
                        className="text-sm font-medium"
                      >
                        Normal
                      </label>
                    </div>
                    <div id="healing_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="healing_input_excessive"
                        value={0}
                        checked={Number(watch('healing')) === 0}
                        {...register('healing')}
                      />
                      <label
                        htmlFor="healing_input_excessive"
                        className="text-sm font-medium"
                      >
                        Complicada
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 10 */}
            <div id="row-10" className="flex flex-col gap-2">
              <div id="hepatitis_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Tem hepatite?
                  </strong>
                  <div
                    id="hepatitis_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="hepatitis_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="hepatitis_input_y"
                        value={1}
                        checked={Number(watch('hepatitis')) === 1}
                        {...register('hepatitis')}
                      />
                      <label
                        htmlFor="hepatitis_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="hepatitis_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="hepatitis_input_n"
                        value={0}
                        checked={Number(watch('hepatitis')) === 0}
                        {...register('hepatitis')}
                      />
                      <label
                        htmlFor="hepatitis_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 11 */}
            <div id="row-11" className="flex flex-col gap-2">
              <div id="breathing_problems_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Problemas respiratórios?
                  </strong>
                  <div
                    id="breathing_problems_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="breathing_problems_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="breathing_problems_input_y"
                        value={1}
                        checked={Number(watch('breathing_problems')) === 1}
                        {...register('breathing_problems')}
                      />
                      <label
                        htmlFor="breathing_problems_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="breathing_problems_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="breathing_problems_input_n"
                        value={0}
                        checked={Number(watch('breathing_problems')) === 0}
                        {...register('breathing_problems')}
                      />
                      <label
                        htmlFor="breathing_problems_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 12 */}
            <div id="row-12" className="flex flex-col gap-2">
              <div id="gastric_problems_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Problemas gástricos?
                  </strong>
                  <div
                    id="gastric_problems_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="gastric_problems_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="gastric_problems_input_y"
                        value={1}
                        checked={Number(watch('gastric_problems')) === 1}
                        {...register('gastric_problems')}
                      />
                      <label
                        htmlFor="gastric_problems_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="gastric_problems_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="gastric_problems_input_n"
                        value={0}
                        checked={Number(watch('gastric_problems')) === 0}
                        {...register('gastric_problems')}
                      />
                      <label
                        htmlFor="gastric_problems_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 13 */}
            <div id="row-13" className="flex flex-col gap-2">
              <div id="joint_problems_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Problemas articulares ou reumatismo?
                  </strong>
                  <div
                    id="joint_problems_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="joint_problems_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="joint_problems_input_y"
                        value={1}
                        checked={Number(watch('joint_problems')) === 1}
                        {...register('joint_problems')}
                      />
                      <label
                        htmlFor="joint_problems_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="joint_problems_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="joint_problems_input_n"
                        value={0}
                        checked={Number(watch('joint_problems')) === 0}
                        {...register('joint_problems')}
                      />
                      <label
                        htmlFor="joint_problems_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 14 */}
            <div id="row-14" className="flex flex-col gap-2">
              <div id="hiv_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Portador do vírus HIV?
                  </strong>
                  <div id="hiv_inputs" className="flex gap-2 text-pucci-500">
                    <div id="hiv_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="hiv_input_y"
                        value={1}
                        checked={Number(watch('hiv')) === 1}
                        {...register('hiv')}
                      />
                      <label
                        htmlFor="hiv_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="hiv_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="hiv_input_n"
                        value={0}
                        checked={Number(watch('hiv')) === 0}
                        {...register('hiv')}
                      />
                      <label
                        htmlFor="hiv_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 15 */}
            <div id="row-15" className="flex flex-col gap-2">
              <div id="anesthesia_reaction_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Já teve alguma reação com anestesia dental?
                  </strong>
                  <div
                    id="anesthesia_reaction_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="anesthesia_reaction_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="anesthesia_reaction_input_y"
                        value={1}
                        checked={Number(watch('anesthesia_reaction')) === 1}
                        {...register('anesthesia_reaction')}
                      />
                      <label
                        htmlFor="anesthesia_reaction_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="anesthesia_reaction_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="anesthesia_reaction_input_n"
                        value={0}
                        checked={Number(watch('anesthesia_reaction')) === 0}
                        {...register('anesthesia_reaction')}
                      />
                      <label
                        htmlFor="anesthesia_reaction_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                  {Number(watch('anesthesia_reaction')) === 1 && (
                    <input
                      type="text"
                      id="anesthesia_reaction_description"
                      className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      placeholder="Qual?"
                      // disabled={mutationLoading}
                      autoComplete="none"
                      autoCorrect="none"
                      {...register('anesthesia_reaction_description')}
                    />
                  )}
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 16 */}
            <div id="row-16" className="flex flex-col gap-2">
              <div id="teeth_gum_pain_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Tem sentido alguma dor nos dentes ou gengiva?
                  </strong>
                  <div
                    id="teeth_gum_pain_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="teeth_gum_pain_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="teeth_gum_pain_input_y"
                        value={1}
                        checked={Number(watch('teeth_gum_pain')) === 1}
                        {...register('teeth_gum_pain')}
                      />
                      <label
                        htmlFor="teeth_gum_pain_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="teeth_gum_pain_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="teeth_gum_pain_input_n"
                        value={0}
                        checked={Number(watch('teeth_gum_pain')) === 0}
                        {...register('teeth_gum_pain')}
                      />
                      <label
                        htmlFor="teeth_gum_pain_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 17 */}
            <div id="row-17" className="flex flex-col gap-2">
              <div id="gum_bleeding_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Sua gengiva sangra?
                  </strong>
                  <div
                    id="gum_bleeding_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="gum_bleeding_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="gum_bleeding_input_normal"
                        value={0}
                        checked={Number(watch('gum_bleeding')) === 0}
                        {...register('gum_bleeding')}
                      />
                      <label
                        htmlFor="gum_bleeding_input_normal"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="gum_bleeding_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="gum_bleeding_input_high"
                        value={1}
                        checked={Number(watch('gum_bleeding')) === 1}
                        {...register('gum_bleeding')}
                      />
                      <label
                        htmlFor="gum_bleeding_input_high"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                    <div id="gum_bleeding_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="gum_bleeding_input_low"
                        value={2}
                        checked={Number(watch('gum_bleeding')) === 2}
                        {...register('gum_bleeding')}
                      />
                      <label
                        htmlFor="gum_bleeding_input_low"
                        className="text-sm font-medium"
                      >
                        Durante a higiene
                      </label>
                    </div>
                    <div id="gum_bleeding_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="gum_bleeding_input_controlled"
                        value={3}
                        checked={Number(watch('gum_bleeding')) === 3}
                        {...register('gum_bleeding')}
                      />
                      <label
                        htmlFor="gum_bleeding_input_controlled"
                        className="text-sm font-medium"
                      >
                        Às vezes
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 18 */}
            <div id="row-18" className="flex flex-col gap-2">
              <div id="ear_pain_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Sente dores ou estalos na região do ouvido?
                  </strong>
                  <div
                    id="ear_pain_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="ear_pain_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="ear_pain_input_y"
                        value={1}
                        checked={Number(watch('ear_pain')) === 1}
                        {...register('ear_pain')}
                      />
                      <label
                        htmlFor="ear_pain_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="ear_pain_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="ear_pain_input_n"
                        value={0}
                        checked={Number(watch('ear_pain')) === 0}
                        {...register('ear_pain')}
                      />
                      <label
                        htmlFor="ear_pain_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 19 */}
            <div id="row-19" className="flex flex-col gap-2">
              <div id="mouth_pain_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Sente dificuldade de abrir a boca?
                  </strong>
                  <div
                    id="mouth_pain_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="mouth_pain_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="mouth_pain_input_y"
                        value={1}
                        checked={Number(watch('mouth_pain')) === 1}
                        {...register('mouth_pain')}
                      />
                      <label
                        htmlFor="mouth_pain_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="mouth_pain_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="mouth_pain_input_n"
                        value={0}
                        checked={Number(watch('mouth_pain')) === 0}
                        {...register('mouth_pain')}
                      />
                      <label
                        htmlFor="mouth_pain_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 20 */}
            <div id="row-20" className="flex flex-col gap-2">
              <div id="bruxism_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Range ou aperta os dentes de dia ou de noite?
                  </strong>
                  <div
                    id="bruxism_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="bruxism_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="bruxism_input_y"
                        value={1}
                        checked={Number(watch('bruxism')) === 1}
                        {...register('bruxism')}
                      />
                      <label
                        htmlFor="bruxism_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="bruxism_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="bruxism_input_n"
                        value={0}
                        checked={Number(watch('bruxism')) === 0}
                        {...register('bruxism')}
                      />
                      <label
                        htmlFor="bruxism_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 21 */}
            <div id="row-21" className="flex flex-col gap-2">
              <div id="smoke_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">Fuma?</strong>
                  <div id="smoke_inputs" className="flex gap-2 text-pucci-500">
                    <div id="smoke_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="smoke_input_y"
                        value={1}
                        checked={Number(watch('smoke')) === 1}
                        {...register('smoke')}
                      />
                      <label
                        htmlFor="smoke_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="smoke_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="smoke_input_n"
                        value={0}
                        checked={Number(watch('smoke')) === 0}
                        {...register('smoke')}
                      />
                      <label
                        htmlFor="smoke_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 22 */}
            <div id="row-22" className="flex flex-col gap-2">
              <div id="alcohol_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Faz uso de bebida alcoólica?
                  </strong>
                  <div
                    id="alcohol_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="alcohol_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="alcohol_input_y"
                        value={1}
                        checked={Number(watch('alcohol')) === 1}
                        {...register('alcohol')}
                      />
                      <label
                        htmlFor="alcohol_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="alcohol_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="alcohol_input_n"
                        value={0}
                        checked={Number(watch('alcohol')) === 0}
                        {...register('alcohol')}
                      />
                      <label
                        htmlFor="alcohol_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 23 */}
            <div id="row-23" className="flex flex-col gap-2">
              <div id="pregnant_breastfeeding_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Gestante ou lactante?
                  </strong>
                  <div
                    id="pregnant_breastfeeding_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div
                      id="pregnant_breastfeeding_input"
                      className="flex gap-2"
                    >
                      <input
                        type="radio"
                        id="pregnant_breastfeeding_input_y"
                        value={1}
                        checked={Number(watch('pregnant_breastfeeding')) === 1}
                        {...register('pregnant_breastfeeding')}
                      />
                      <label
                        htmlFor="pregnant_breastfeeding_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div
                      id="pregnant_breastfeeding_input"
                      className="flex gap-2"
                    >
                      <input
                        type="radio"
                        id="pregnant_breastfeeding_input_n"
                        value={0}
                        checked={Number(watch('pregnant_breastfeeding')) === 0}
                        {...register('pregnant_breastfeeding')}
                      />
                      <label
                        htmlFor="pregnant_breastfeeding_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 24 */}
            <div id="row-24" className="flex flex-col gap-2">
              <div id="another_info_input_block" className="w-full ">
                <div className="flex flex-col gap-1">
                  <strong className="text-pucci-500 text-xs">
                    Alguma informação que não tenha perguntado?
                  </strong>
                  <div
                    id="another_info_inputs"
                    className="flex gap-2 text-pucci-500"
                  >
                    <div id="another_info_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="another_info_input_y"
                        value={1}
                        checked={Number(watch('another_info')) === 1}
                        {...register('another_info')}
                      />
                      <label
                        htmlFor="another_info_input_y"
                        className="text-sm font-medium"
                      >
                        Sim
                      </label>
                    </div>
                    <div id="another_info_input" className="flex gap-2">
                      <input
                        type="radio"
                        id="another_info_input_n"
                        value={0}
                        checked={Number(watch('another_info')) === 0}
                        {...register('another_info')}
                      />
                      <label
                        htmlFor="another_info_input_n"
                        className="text-sm font-medium"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                  {Number(watch('another_info')) === 1 && (
                    <input
                      type="text"
                      id="another_info_description"
                      className="p-3 rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      placeholder="Qual?"
                      // disabled={mutationLoading}
                      autoComplete="none"
                      autoCorrect="none"
                      {...register('another_info_description')}
                    />
                  )}
                </div>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>

            {/* ROW 24 */}
            <div id="row-24" className="flex flex-col gap-2">
              <div id="description_input_block" className="w-full ">
                <label
                  className="flex flex-col gap-1"
                  htmlFor="description_input"
                >
                  <strong className="text-pucci-500 text-xs">
                    Queixa principal e evolução da doença atual:
                  </strong>
                  <textarea
                    className="p-2 resize-none w-full h-[150px] rounded text-slate-600 text-sm focus:outline-1 focus:outline-fuchsia-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    id="description_input"
                    placeholder="Queixa e evolução"
                    {...register('description')}
                  />
                </label>
                {/* <ErrorMessage
              errors={errors}
              name="customer_name"
              render={({ message }) => (
                <small className="text-red-500 text-xs font-bold">
                  {message}
                </small>
              )}
            /> */}
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="row-span-1 bg-lime-600 py-4 rounded hover:bg-lime-900 transition-colors font-bold disabled:bg-gray-300 disabled:cursor-not-allowed col-span-2"
            disabled={patients.isLoading || !isValid}
          >
            Salvar paciente
          </button>
        </form>
      ) : (
        <TreatmentPlanForm />
      )}
    </section>
  );
};

export default NewTreatmentForm;
