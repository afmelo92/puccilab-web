import React from 'react';
import AddCircleIcon from '@/assets/icons/add-circle';
import HomeIcon from '@/assets/icons/home';
import ToothIcon from '@/assets/icons/tooth';
import UsersIcon from '@/assets/icons/users';
import LogoSimple from '@/assets/icons/logo-simple';
import HamburgerMenu from '@/assets/icons/hamburger-menu';
import Instagram from '@/assets/icons/instagram';
import ToothMapA from '@/assets/icons/tooth-map-a';
import ToothMapB from '@/assets/icons/tooth-map-b';
import Refresh from '@/assets/icons/refresh';
import TrashIcon from '@/assets/icons/trash';
import EditIcon from '@/assets/icons/edit';
import BackIcon from '@/assets/icons/back';
import CloseIcon from '@/assets/icons/close';
import CalendarIcon from '@/assets/icons/calendar';
import MedkitIcon from '@/assets/icons/medkit';
import MagnifierIcon from '@/assets/icons/magnifier';
import Map11 from '@/assets/icons/map-11';
import Map21 from '@/assets/icons/map-21';
import Map12 from '@/assets/icons/map-12';
import Map22 from '@/assets/icons/map-22';
import Map13 from '@/assets/icons/map-13';
import Map23 from '@/assets/icons/map-23';
import Map14 from '@/assets/icons/map-14';
import Map24 from '@/assets/icons/map-24';
import Map15 from '@/assets/icons/map-15';
import Map25 from '@/assets/icons/map-25';
import Map16 from '@/assets/icons/map-16';
import Map26 from '@/assets/icons/map-26';
import Map17 from '@/assets/icons/map-17';
import Map27 from '@/assets/icons/map-27';
import Map18 from '@/assets/icons/map-18';
import Map28 from '@/assets/icons/map-28';
import Map41 from '@/assets/icons/map-41';
import Map31 from '@/assets/icons/map-31';
import Map42 from '@/assets/icons/map-42';
import Map32 from '@/assets/icons/map-32';
import Map43 from '@/assets/icons/map-43';
import Map33 from '@/assets/icons/map-33';
import Map34 from '@/assets/icons/map-34';
import Map44 from '@/assets/icons/map-44';
import Map45 from '@/assets/icons/map-45';
import Map35 from '@/assets/icons/map-35';
import Map46 from '@/assets/icons/map-46';
import Map36 from '@/assets/icons/map-36';
import Map47 from '@/assets/icons/map-47';
import Map37 from '@/assets/icons/map-37';
import Map48 from '@/assets/icons/map-48';
import Map38 from '@/assets/icons/map-38';

export type IconNames =
  | 'home'
  | 'tooth'
  | 'users'
  | 'add-circle'
  | 'logo-simple'
  | 'hamburger-menu'
  | 'instagram'
  | 'tooth-map-a'
  | 'tooth-map-b'
  | 'refresh'
  | 'trash'
  | 'edit'
  | 'back'
  | 'close'
  | 'calendar'
  | 'medkit'
  | 'magnifier'
  | 'map11'
  | 'map12'
  | 'map13'
  | 'map14'
  | 'map15'
  | 'map16'
  | 'map17'
  | 'map18'
  | 'map21'
  | 'map22'
  | 'map23'
  | 'map24'
  | 'map25'
  | 'map26'
  | 'map27'
  | 'map28'
  | 'map31'
  | 'map32'
  | 'map33'
  | 'map34'
  | 'map35'
  | 'map36'
  | 'map37'
  | 'map38'
  | 'map41'
  | 'map42'
  | 'map43'
  | 'map44'
  | 'map45'
  | 'map46'
  | 'map47'
  | 'map48';

type GetIconProps = {
  name: IconNames;
  className?: string;
};

const Icon: React.FC<GetIconProps> = ({ name, className = '' }) => {
  switch (name) {
    case 'home':
      return <HomeIcon className={className} />;
    case 'tooth':
      return <ToothIcon className={className} />;
    case 'users':
      return <UsersIcon className={className} />;
    case 'add-circle':
      return <AddCircleIcon className={className} />;
    case 'logo-simple':
      return <LogoSimple className={className} />;
    case 'hamburger-menu':
      return <HamburgerMenu className={className} />;
    case 'instagram':
      return <Instagram className={className} />;
    case 'tooth-map-a':
      return <ToothMapA className={className} />;
    case 'tooth-map-b':
      return <ToothMapB className={className} />;
    case 'refresh':
      return <Refresh className={className} />;
    case 'trash':
      return <TrashIcon className={className} />;
    case 'edit':
      return <EditIcon className={className} />;
    case 'back':
      return <BackIcon className={className} />;
    case 'close':
      return <CloseIcon className={className} />;
    case 'calendar':
      return <CalendarIcon className={className} />;
    case 'medkit':
      return <MedkitIcon className={className} />;
    case 'magnifier':
      return <MagnifierIcon className={className} />;
    case 'map11':
      return <Map11 className={className} />;
    case 'map12':
      return <Map12 className={className} />;
    case 'map13':
      return <Map13 className={className} />;
    case 'map14':
      return <Map14 className={className} />;
    case 'map15':
      return <Map15 className={className} />;
    case 'map16':
      return <Map16 className={className} />;
    case 'map16':
      return <Map16 className={className} />;
    case 'map17':
      return <Map17 className={className} />;
    case 'map18':
      return <Map18 className={className} />;
    case 'map21':
      return <Map21 className={className} />;
    case 'map22':
      return <Map22 className={className} />;
    case 'map23':
      return <Map23 className={className} />;
    case 'map24':
      return <Map24 className={className} />;
    case 'map25':
      return <Map25 className={className} />;
    case 'map26':
      return <Map26 className={className} />;
    case 'map27':
      return <Map27 className={className} />;
    case 'map28':
      return <Map28 className={className} />;
    case 'map31':
      return <Map31 className={className} />;
    case 'map32':
      return <Map32 className={className} />;
    case 'map33':
      return <Map33 className={className} />;
    case 'map34':
      return <Map34 className={className} />;
    case 'map35':
      return <Map35 className={className} />;
    case 'map36':
      return <Map36 className={className} />;
    case 'map37':
      return <Map37 className={className} />;
    case 'map38':
      return <Map38 className={className} />;
    case 'map41':
      return <Map41 className={className} />;
    case 'map42':
      return <Map42 className={className} />;
    case 'map43':
      return <Map43 className={className} />;
    case 'map44':
      return <Map44 className={className} />;
    case 'map45':
      return <Map45 className={className} />;
    case 'map46':
      return <Map46 className={className} />;
    case 'map47':
      return <Map47 className={className} />;
    case 'map48':
      return <Map48 className={className} />;
    default:
      return null;
  }
};

export default Icon;
