import express from "express";
import serverless from "serverless-http";
import { app } from "../../app"; // Hier den korrekten Pfad zu Ihrer App anpassen

// Exportieren des Handlers
export const handler = serverless(app);
