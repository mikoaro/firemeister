


def send_sms():
        """A method that sends an SMS."""

        # Extract the form values:
        to_number = request.form["to_number"]
        message = request.form["message"]

        # Send the SMS message:
        result = nexmo_client.send_message(
            {
                "from": VONAGE_NUMBER,
                "to": to_number,
                "text": message,
            }
        )

        # Redirect the user back to the form:
        return redirect(url_for("index"))