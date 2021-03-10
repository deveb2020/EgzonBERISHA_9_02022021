import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/dom";
import { localStorageMock } from "../__mocks__/localStorage.js";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import firestore from "../app/Firestore";
import firebase from "../__mocks__/firebase";

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page and I add an image file (jpg, jpeg or png)", () => {
    test("Then I should add this new file to the firestore", () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );
      const html = NewBillUI();
      document.body.innerHTML = html;
      const newBill = new NewBill({
        document,
        onNavigate,
        firestore,
        localStorage: window.localStorage,
      });
      // const imgFile = "image.jpg";
      // fireEvent.change(inputFile, { target: { value: imgFile } });
      // console.log(newBill);
      // expect(inputFile.value).toBe(imgFile);
      const handleChangeFile = jest.fn((e) => newBill.handleChangeFile(e));
      const inputFile = screen.getByTestId("file");
      inputFile.addEventListener("change", handleChangeFile);
      fireEvent.change(inputFile);
      expect(handleChangeFile).toHaveBeenCalled();
    });
  });
});

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page and I add a file other than an image (jpg, jpeg or png)", () => {
    test("Then the file shouldn't be added to the firestore", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      //to-do write assertion
    });
  });
});

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page and I submit the form", () => {
    test("Then it should create a new bill", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      //to-do write assertion
    });
  });
});

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page and I add a file other than an image (jpg, jpeg or png)", () => {
    test("Then, Bills page should be rendered", () => {
      const html = NewBillUI();
      document.body.innerHTML = html;
      //to-do write assertion
    });
  });
});

// test d'intégration POST
describe("Given I am a user connected as Employee", () => {
  describe("When I create a new bill", () => {
    test("Add bill to mock API POST", async () => {
      // const getSpy = jest.spyOn(firebase, "get");
      // const bills = await firebase.get();
      // expect(getSpy).toHaveBeenCalledTimes(1);
      // expect(bills.data.length).toBe(4);
    });
    test("Add bill tp API and fails with 404 message error", async () => {
      // firebase.get.mockImplementationOnce(() =>
      //   Promise.reject(new Error("Erreur 404"))
      // );
      // const html = DashboardUI({ error: "Erreur 404" });
      // document.body.innerHTML = html;
      // const message = await screen.getByText(/Erreur 404/);
      // expect(message).toBeTruthy();
    });
    test("Add bill to API and fails with 500 message error", async () => {
      // firebase.get.mockImplementationOnce(() =>
      //   Promise.reject(new Error("Erreur 500"))
      // );
      // const html = DashboardUI({ error: "Erreur 500" });
      // document.body.innerHTML = html;
      // const message = await screen.getByText(/Erreur 500/);
      // expect(message).toBeTruthy();
    });
  });
});
