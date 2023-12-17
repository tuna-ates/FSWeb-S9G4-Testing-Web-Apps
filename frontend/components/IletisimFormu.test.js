/* eslint-disable no-unused-vars */
import React from 'react';
//import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';
import { act, render, screen, waitFor } from '@testing-library/react';

beforeEach(()=>{
  render(<IletisimFormu/>);
});

test('hata olmadan render ediliyor', () => {
  //render(<IletisimFormu/>);
});

test('iletişim formu headerı render ediliyor', () => {

  //render(<IletisimFormu/>);
  const header=screen.getByText("İletişim Formu");
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/İletişim Formu/i);
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
       render(<IletisimFormu/>);

       const isimAlanı=screen.getByLabelText("Ad*");
       userEvent.type(isimAlanı,"123");

       const hataMesajları= await screen.findAllByTestId("error");
       expect(hataMesajları).toHaveLength(1);
  
});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
  const gonderButton=screen.getByRole('button');
  userEvent.click(gonderButton);

  await waitFor(()=>{
    const hataMesajı=  screen.queryAllByTestId("error");
       expect(hataMesajı).toHaveLength(3);
  });

});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
  const isimAlanı=screen.getByTestId("ad-input");
  userEvent.type(isimAlanı,"tunahan");

  const soyadAlanı=screen.getByTestId("soyad-input");
  userEvent.type(soyadAlanı,"ates");

  const gonderButton=screen.getByRole('button');
  userEvent.click(gonderButton);

  const hataMesajları= await screen.findAllByTestId("error");
  expect(hataMesajları).toHaveLength(1);


});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {

  const email=screen.getByLabelText("Email*");
  userEvent.type(email,"asdasda");

  await waitFor(()=>{
    const hataMesajı=  screen.queryByTestId("error");
       expect(hataMesajı).toHaveTextContent("Hata: email geçerli bir email adresi olmalıdır.");
  });
  
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
      const isimAlanı=screen.getByTestId("ad-input");
      userEvent.type(isimAlanı,"tunahan");

      const emailAlanı=screen.getByTestId("email-input");
      userEvent.type(emailAlanı,"tunahan@gmail.com");

      const gonderButton=screen.getByRole("button");
      userEvent.click(gonderButton);

      const hataMesajı= await screen.findByText(/ soyad gereklidir./);
      expect(hataMesajı).toBeInTheDocument();
      
      

});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {

  const isimAlanı=screen.getByTestId("ad-input");
  userEvent.type(isimAlanı,"tunahan");

  const emailAlanı=screen.getByTestId("email-input");
  userEvent.type(emailAlanı,"tunahan@gmail.com");

  const soyadAlanı=screen.getByTestId("soyad-input");
  userEvent.type(soyadAlanı,"ates");

  const gonderButton=screen.getByRole("button");
  userEvent.click(gonderButton);

  await waitFor(()=>{
    const hataMesajı=  screen.queryAllByTestId("error");
       expect(hataMesajı).toHaveLength(0);

       const firstnameDisplay=screen.getByTestId("firstnameDisplay");
       const lastnameDisplay=screen.getByTestId("lastnameDisplay");
       const emailDisplay=screen.getByTestId("emailDisplay");
       const messageDisplay=screen.queryByTestId("messageDisplay");

       expect(firstnameDisplay).toHaveTextContent("tunahan");
       expect(lastnameDisplay).toHaveTextContent("ates");
       expect(emailDisplay).toHaveTextContent("tunahan@gmail.com");
       expect(messageDisplay).not.toBeInTheDocument();

  });


});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
  const isimAlanı=screen.getByTestId("ad-input");
  userEvent.type(isimAlanı,"tunahan");

  const emailAlanı=screen.getByTestId("email-input");
  userEvent.type(emailAlanı,"tunahan@gmail.com");

  const soyadAlanı=screen.getByTestId("soyad-input");
  userEvent.type(soyadAlanı,"ates");

  const mesajAlanı=screen.getByTestId("mesaj-input");
  userEvent.type(mesajAlanı,"selam");

  const gonderButton=screen.getByRole("button");
  userEvent.click(gonderButton);

  await waitFor(()=>{
    const hataMesajı=  screen.queryAllByTestId("error");
       expect(hataMesajı).toHaveLength(0);

       const firstnameDisplay=screen.getByTestId("firstnameDisplay");
       const lastnameDisplay=screen.getByTestId("lastnameDisplay");
       const emailDisplay=screen.getByTestId("emailDisplay");
       const messageDisplay=screen.getByTestId("messageDisplay");

       expect(firstnameDisplay).toHaveTextContent("tunahan");
       expect(lastnameDisplay).toHaveTextContent("ates");
       expect(emailDisplay).toHaveTextContent("tunahan@gmail.com");
       expect(messageDisplay).toHaveTextContent("selam");

  });

});
