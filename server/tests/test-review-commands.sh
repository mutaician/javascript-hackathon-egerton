#!/bin/bash

# Base URLs for the API
BUSINESS_URL="http://localhost:5000/api/businesses"
REVIEW_URL="http://localhost:5000/api/reviews"

# 1. First create a test business to add reviews to
echo "Creating a test business..."
BUSINESS_ID=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Business for Reviews",
    "description": "A business to test reviews",
    "category": "Testing",
    "location": "Test Location"
  }' \
  $BUSINESS_URL | grep -o '"_id":"[^"]*' | cut -d'"' -f4)

echo "Created business with ID: $BUSINESS_ID"
echo "-----------------------------------"

# 2. Create a review for the business
echo "Creating a review..."
REVIEW_ID=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "{
    \"businessId\": \"$BUSINESS_ID\",
    \"rating\": 4,
    \"comment\": \"Great service! Would recommend.\"
  }" \
  $REVIEW_URL | grep -o '"_id":"[^"]*' | cut -d'"' -f4)

echo "Created review with ID: $REVIEW_ID"
echo "-----------------------------------"

# 3. Get all reviews for the business
echo "Getting all reviews for the business..."
curl -X GET "$REVIEW_URL/business/$BUSINESS_ID"
echo -e "\n-----------------------------------"

# 4. Get single review
echo "Getting single review..."
curl -X GET "$REVIEW_URL/$REVIEW_ID"
echo -e "\n-----------------------------------"

# 5. Update review
echo "Updating review..."
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "comment": "Updated: Excellent service! Highly recommended!"
  }' \
  "$REVIEW_URL/$REVIEW_ID"
echo -e "\n-----------------------------------"

# 6. Get updated review
echo "Getting updated review..."
curl -X GET "$REVIEW_URL/$REVIEW_ID"
echo -e "\n-----------------------------------"

# 7. Delete review
echo "Deleting review..."
curl -X DELETE "$REVIEW_URL/$REVIEW_ID"
echo -e "\n-----------------------------------"

# 8. Clean up - delete test business
echo "Cleaning up - deleting test business..."
curl -X DELETE "$BUSINESS_URL/$BUSINESS_ID"
echo -e "\n-----------------------------------"
