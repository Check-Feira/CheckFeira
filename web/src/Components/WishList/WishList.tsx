import { ChangeEvent, useEffect, useState } from 'react';
import { WishlistItem } from '@/Types/WishlistItem.interface';
import api from '../../Lib/Api';

import { NewItem } from './NewItem';

// bootstrap components
import Table from 'react-bootstrap/Table';
import { ButtonGroup, Form, Modal, Stack } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

// icons
import iconTrash from '../../Assets/icon-trash.svg';
import iconPencil from '../../Assets/icon-pencil.svg';

export function WishList() {

  const [items, setItems] = useState<WishlistItem[]>([]);
  const [updateItem, setUpdateItem] = useState<WishlistItem>({} as WishlistItem);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const wishlistItems = items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateItem({ ...updateItem, name: e.target.value });
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateItem({ ...updateItem, price: parseFloat(e.target.value) });
  };

  const getWishListItems = async () => {
    try {
      const response = await api.getWishList();
      setItems(response);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    getWishListItems();
  }, []);

  const updateWishListItems = () => {
    getWishListItems();
  }

  const handleDeleteItem = async (itemId: string) => {
    try {
      await api.deleteWishList(itemId);
      const updatedProducts = items.filter(item => item._id !== itemId);
      setItems(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditItem = async (itemId: string) => {
    try {
      const item = await api.getWishListItem(itemId);
      setUpdateItem(item);
      handleShowModal();
    } catch (error) {
      console.error("Error getting wishlist item details:", error);
    }
  };

  const handleUpdateItem = async (itemId: string) => {
    const { _id, ...updatedFields } = updateItem;
    try {
      await api.putWishList(itemId, updatedFields);
      const updatedItems = items.map(item =>
        item._id === itemId ? updateItem : item
      );
      setItems(updatedItems);
      handleCloseModal();
    } catch (error) {
      console.error("Error getting wishlist item details:", error);
    }
  }

  return (
    <>
      <Stack direction='vertical'>
        <NewItem searchItem={search} setSearchItem={handleSearchChange} updateWishlist={updateWishListItems} />
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Produto</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((item, index) => (
                <tr className='align-baseline' key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <ButtonGroup>
                      <Button variant='white' onClick={() => handleEditItem(item?._id)}><Image src={iconPencil} /></Button>
                      <Button variant='white' onClick={() => handleDeleteItem(item?._id)}><Image src={iconTrash} /></Button>
                    </ButtonGroup>
                  </td>
                </tr>
            ))}
          </tbody>
        </Table>
      </Stack>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editando o produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome do produto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome"
                value={updateItem?.name}
                onChange={handleNameChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="valor">
              <Form.Label>Valor do produto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite o valor"
                value={updateItem?.price}
                onChange={handlePriceChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={() => handleUpdateItem(updateItem._id)}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
