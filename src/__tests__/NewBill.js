import {
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/dom";
import { localStorageMock } from "../__mocks__/localStorage.js";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import BillsUI from "../views/BillsUI.js";
import firestore from "../app/Firestore";
import firebase from "../__mocks__/firebase";
import { ROUTES, ROUTES_PATH } from "../constants/routes";

jest.mock("../app/Firestore");

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
        firestore: null,
        localStorage: window.localStorage,
      });
      const handleChangeFile = jest.fn(newBill.handleChangeFile);
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
  describe("When I am on NewBill Page and I submit the form width an image (jpg, jpeg, png)", () => {
    test("Then it should create a new bill", () => {
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
      const firestore = null;
      const html = NewBillUI();
      document.body.innerHTML = html;

      const newBill = new NewBill({
        document,
        onNavigate,
        firestore,
        localStorage: window.localStorage,
      });
      const handleSubmit = jest.fn(newBill.handleSubmit);
      const submitBtn = screen.getByTestId("form-new-bill");
      submitBtn.addEventListener("submit", handleSubmit);
      fireEvent.submit(submitBtn);
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page and I add a file other than an image (jpg, jpeg or png)", () => {
    test("Then, the bill shouldn't be created and I stay on the NewBill page", () => {
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
      const firestore = null;
      const html = NewBillUI();
      document.body.innerHTML = html;

      const newBill = new NewBill({
        document,
        onNavigate,
        firestore,
        localStorage: window.localStorage,
      });
      const handleSubmit = jest.fn(newBill.handleSubmit);
      newBill.fileName = "invalid";
      const submitBtn = screen.getByTestId("form-new-bill");
      submitBtn.addEventListener("submit", handleSubmit);
      fireEvent.submit(submitBtn);
      expect(handleSubmit).toHaveBeenCalled();
      expect(screen.getAllByText("Envoyer une note de frais")).toBeTruthy();
    });
  });
});

// test d'intégration POST
describe("Given I am a user connected as Employee", () => {
  describe("When I create a new bill", () => {
    test("Add bill to mock API POST", async () => {
      const getSpyPost = jest.spyOn(firebase, "post");
      const newBill = {
        id: "eoKIpYhECmaZAGRrHjaC",
        status: "refused",
        pct: 10,
        amount: 500,
        email: "john@doe.com",
        name: "Facture 236",
        vat: "60",
        fileName: "preview-facture-free-201903-pdf-1.jpg",
        date: "2021-03-13",
        commentAdmin: "à valider",
        commentary: "A déduire",
        type: "Restaurants et bars",
        fileUrl: "https://saving.com",
      };
      const bills = await firebase.post(newBill);
      expect(getSpyPost).toHaveBeenCalledTimes(1);
      expect(bills.data.length).toBe(5);
    });
    test("Add bill to API and fails with 404 message error", async () => {
      firebase.post.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 404"))
      );
      const html = BillsUI({ error: "Erreur 404" });
      document.body.innerHTML = html;
      const message = await screen.getByText(/Erreur 404/);
      expect(message).toBeTruthy();
    });
    test("Add bill to API and fails with 500 message error", async () => {
      firebase.post.mockImplementationOnce(() =>
        Promise.reject(new Error("Erreur 404"))
      );
      const html = BillsUI({ error: "Erreur 500" });
      document.body.innerHTML = html;
      const message = await screen.getByText(/Erreur 500/);
      expect(message).toBeTruthy();
    });
  });
});
