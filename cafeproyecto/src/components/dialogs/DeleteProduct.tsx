import React from 'react';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import '../../styles/dialog/delete-theme.css';
import { TrashIcon } from '@radix-ui/react-icons';

import { Product } from '../../interfaces/ProductsInterface';
import { Button } from '@radix-ui/themes';


interface DeleteProduct {
    producto: Product;
    triggerRef: React.RefObject<HTMLButtonElement>;
}

const DeleteDialog: React.FC<DeleteProduct> = ({producto, triggerRef }) => (
  <AlertDialog.Root>
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
            <button className="Button red">Aceptar</button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default DeleteDialog;