import { app } from "@/app";
import { SubscribeBody } from "@/modules/subscription/subscription.schema";
import * as subscriptionService from "@/modules/subscription/subscription.service";
import { describe, expect, it, jest } from "@jest/globals";
import { Subscription } from "@prisma/client";
import request from "supertest";

jest.mock("@/modules/subscription/subscription.service", () => ({
  subscribe: jest.fn(),
  confirmSubscription: jest.fn(),
  unsubscribe: jest.fn(),
}));

describe("Subscription Endpoints", () => {
  describe("POST /subscribe", () => {
    it("should successfully subscribe a new email", async () => {
      const subscribeData: SubscribeBody = {
        email: "test@example.com",
        city: "London",
        frequency: "DAILY",
      };

      (
        subscriptionService.subscribe as jest.Mock<
          (
            data: SubscribeBody
          ) => Promise<{ confirmToken: string; unsubscribeToken: string }>
        >
      ).mockResolvedValueOnce({
        confirmToken: "test-token",
        unsubscribeToken: "unsubscribe-token",
      });

      const response = await request(app)
        .post("/subscribe")
        .send(subscribeData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Subscription created. Please check your email to confirm."
      );
      expect(response.body).toHaveProperty("subscription");
      expect(response.body.subscription).toHaveProperty(
        "email",
        "test@example.com"
      );
    });

    it("should return 400 for invalid email format", async () => {
      const response = await request(app).post("/subscribe").send({
        email: "invalid-email",
        city: "London",
        frequency: "DAILY",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toContain("email");
    });

    it("should return 400 for missing required fields", async () => {
      const response = await request(app).post("/subscribe").send({
        email: "test@example.com",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should return 409 for duplicate email subscription", async () => {
      const subscribeData: SubscribeBody = {
        email: "duplicate@example.com",
        city: "London",
        frequency: "DAILY",
      };

      (
        subscriptionService.subscribe as jest.Mock<
          (
            data: SubscribeBody
          ) => Promise<{ confirmToken: string; unsubscribeToken: string }>
        >
      ).mockRejectedValueOnce(new Error("Email already subscribed"));

      const response = await request(app)
        .post("/subscribe")
        .send(subscribeData);

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Email already subscribed");
    });
  });

  describe("GET /confirm/:token", () => {
    it("should successfully confirm subscription", async () => {
      const mockSubscription: Subscription = {
        id: 1,
        email: "test@example.com",
        city: "London",
        frequency: "DAILY",
        confirmed: true,
        confirmToken: null,
        confirmTokenExpiresAt: null,
        unsubscribeToken: "unsubscribe-token",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSentAt: null,
      };

      (
        subscriptionService.confirmSubscription as jest.Mock<
          (subscriptionId: number) => Promise<Subscription>
        >
      ).mockResolvedValueOnce(mockSubscription);

      const response = await request(app).get("/confirm/valid-token");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Subscription confirmed successfully"
      );
      expect(response.body).toHaveProperty("subscription");
      expect(response.body.subscription.confirmed).toBe(true);
    });

    it("should return 404 for invalid token", async () => {
      (
        subscriptionService.confirmSubscription as jest.Mock<
          (subscriptionId: number) => Promise<Subscription>
        >
      ).mockRejectedValueOnce(new Error("Invalid or expired token"));

      const response = await request(app).get("/confirm/invalid-token");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Invalid or expired token");
    });
  });

  describe("GET /unsubscribe/:token", () => {
    it("should successfully unsubscribe", async () => {
      const mockSubscription: Subscription = {
        id: 1,
        email: "test@example.com",
        city: "London",
        frequency: "DAILY",
        confirmed: true,
        confirmToken: null,
        confirmTokenExpiresAt: null,
        unsubscribeToken: "unsubscribe-token",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSentAt: null,
      };
      (
        subscriptionService.unsubscribe as jest.Mock<
          (subscriptionId: number) => Promise<Subscription>
        >
      ).mockResolvedValueOnce(mockSubscription);

      const response = await request(app).get("/unsubscribe/valid-token");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Successfully unsubscribed"
      );
    });

    it("should return 404 for invalid token", async () => {
      (
        subscriptionService.unsubscribe as jest.Mock<
          (subscriptionId: number) => Promise<Subscription>
        >
      ).mockRejectedValueOnce(new Error("Invalid unsubscribe token"));

      const response = await request(app).get("/unsubscribe/invalid-token");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Invalid unsubscribe token");
    });
  });
});
