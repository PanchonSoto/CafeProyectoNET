import React, { useState } from 'react';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import '../../styles/dialog/delete-theme.css';

import useEditProduct from '../../hooks/useEditProduct';


interface DeleteProduct {
  id: number;
  triggerRef: React.RefObject<HTMLButtonElement>;
  onProductUpdated: () => void;
}

const DeleteDialog: React.FC<DeleteProduct> = ({ id, triggerRef, onProductUpdated }) => {

  const [isOpen, setIsOpen] = useState(false);
  const { deleteProduct } = useEditProduct();
  const [error, setError] = useState('');

  const handleSubmit = async (event:React.FormEvent) => {

    event.preventDefault();
    try {
      const deleteddProduct = await deleteProduct(id)
      onProductUpdated();
      setIsOpen(false);
      console.log(deleteddProduct);
      
    } catch (err) {
      console.log(err);
      setError(JSON.stringify(err));
    }
  };


  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Trigger asChild>
        <Button className="Button delete">
          <TrashIcon />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">Estas seguro?</AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            Esta acción no se puede revertir. Esto borrará los datos del producto.
          </AlertDialog.Description>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <button className="Button mauve">Cancelar</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button ref={triggerRef} className="Button red" onClick={handleSubmit}>Aceptar</button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}

export default DeleteDialog;
