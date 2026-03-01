export function handleApiError(error, context = "API Error") {
  console.error(`❌ ${context}:`, error);

  const isProduction = process.env.NODE_ENV === "production";
  const message = error.message || "An unexpected error occurred";
  
  // Basic security: don't leak full error objects or stack traces in production
  const errorResponse = {
    success: false,
    error: message,
    ...(isProduction ? {} : { detail: error.toString(), stack: error.stack }),
  };

  const status = error.status || 500;
  
  return Response.json(errorResponse, { status });
}

export function validateFields(data, fields) {
  const missing = fields.filter(field => !data.get ? !data[field] : !data.get(field));
  if (missing.length > 0) {
    const error = new Error(`Missing required fields: ${missing.join(", ")}`);
    error.status = 400;
    throw error;
  }
}
