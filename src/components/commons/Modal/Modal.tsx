import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { ComponentPropsWithoutRef, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { clsxm } from '@/lib';

import { Icon } from '@/components/commons/Icon/Icon';

import { isBrowser } from '@/constants';

import { Overlay } from './components/Overlay';

export type ModalType = {
  isOpen: boolean;
  handleClose: () => void;
};

export const Modal = ({
  isOpen,
  className,
  children,
  handleClose,
}: ComponentPropsWithoutRef<'div'> & ModalType) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (isOpen) {
      if (modalElement) disableBodyScroll(modalElement);
    } else {
      if (modalElement) enableBodyScroll(modalElement);
    }

    return () => {
      if (modalElement) enableBodyScroll(modalElement);
    };
  }, [isOpen]);

  if (!isBrowser) return null;
  const modalRoot = document?.getElementById('modal-root');

  const modalContent = isOpen ? (
    <>
      <Overlay className='z-[49]' {...{ isOpen }} />
      <div
        ref={modalRef}
        className={clsxm(
          'fixed top-1/2 left-1/2 z-50 flex h-full w-full -translate-y-1/2 -translate-x-1/2 flex-col gap-10 overflow-y-auto overflow-x-hidden bg-white shadow transition-opacity',
          'md:h-auto md:max-h-[80vh] md:w-4/5',
          'lg:h-auto lg:max-h-[80vh] lg:w-auto lg:gap-8 lg:overflow-auto',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
          className
        )}
      >
        <button
          className='absolute top-4 right-4 md:top-11 md:right-11'
          onClick={handleClose}
        >
          <Icon name='close-modal' className='h-7 w-7' />
          <span className='sr-only'>Close menu</span>
        </button>

        {children}
      </div>
    </>
  ) : null;

  if (isBrowser && modalRoot) {
    return ReactDOM.createPortal(modalContent, modalRoot);
  } else {
    return null;
  }
};
