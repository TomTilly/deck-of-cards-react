function checkStatusAndParse(response) {
  if (!response.ok)
    throw new Error(
      `Error fetching resource. Response Status Code: ${response.status}, Response: ${response}`
    );

  return response.json();
}

export { checkStatusAndParse };
