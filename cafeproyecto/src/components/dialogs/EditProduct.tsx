import React, { ReactNode, useState } from 'react';

import { Button } from '@radix-ui/themes';
import { Cross2Icon, Pencil2Icon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';
import '../../styles/dialog/dialog-theme.css';

import { Product } from '../../interfaces/ProductsInterface';
import useEditProduct from '../../hooks/useEditProduct';



interface EditProduct {
  producto: Product;
  triggerRef: any;
  onProductUpdated: () => void;
}

const EditProductDialog: React.FC<EditProduct> = ({ producto, triggerRef, onProductUpdated  }) => {


  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const [refresh, setRefresh] = useState(false);
  const { editProduct } = useEditProduct();
  
  const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target?.value);
  };
  
  const handleDescChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };
  
  const handlePriceChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target?.value);
  };
  
  const handleImageUrlChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };
  
  const handleSubmit = async (event:React.FormEvent) => {

    event.preventDefault();
    try {
      const body = {
        productoId: producto.productoId,
        nombre: name !== undefined && name !== '' ? name : producto.nombre,
        descripcion: desc !== undefined && desc !== '' ? desc : producto.descripcion,
        precio: price !== undefined && price !== '' ? parseFloat(price) : producto.precio,
        disponible: true,
        fechaCreacion: producto?.fechaCreacion,
        imagenUrl: imageUrl !== undefined && imageUrl !== '' ? imageUrl : producto.imagenUrl,
      };
      const updatedProduct = await editProduct(body);
      onProductUpdated();
      setIsOpen(false);
      console.log(updatedProduct);
    } catch (err) {
      console.log(err);
      setError(JSON.stringify(err));
    }
  };


  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button ref={triggerRef} className="Button violet">
          <Pencil2Icon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Editar Producto</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Modifica los detalles del producto. Haz clic en guardar cuando hayas terminado.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="nombre">Nombre</label>
            <input className="Input" id="nombre" defaultValue={producto.nombre} onChange={handleNameChange}/>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="descripcion">Descripción</label>
            <input className="Input" id="descripcion" defaultValue={producto.descripcion} onChange={handleDescChange}/>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="precio">Precio</label>
            <input className="Input" id="precio" defaultValue={producto.precio} onChange={handlePriceChange}/>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="nombre">Imagen(URL)</label>
            <input className="Input" id="nombre" defaultValue={producto.imagenUrl} onChange={handleImageUrlChange}/>
          </fieldset>
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button className="Button green" onClick={handleSubmit}>Guardar cambios</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Cerrar">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default EditProductDialog;