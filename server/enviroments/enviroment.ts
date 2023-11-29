const auth = {
    "type": "service_account",
    "project_id": "infosp-48118",
    "private_key_id": "fbabc5413ffbd7d6f1b0a6930afe7d3b24e70a0a",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC+PU7fwy6YNxPm\nggrax3izmdiOuPCFQhcUiKvoUiJbZfEcJv/gNleuWA38gL0PywUwaiuE5L7lcij1\ncNQjbsAJXExnnP6JEJ+v8dJ4vHg+DZnDquKRNlNoHmn8OtSCGnWeaU7LGoZgDMhV\nrTw2tLQUjTdo2tAWdMq1iY+BNYpht9bIw/pv2hXy3bwTR8lF2OfLAzXZfRtZmGvi\nhUjCj58vMNHydCc9rzyizAxTUclhgudtKCk25nhl8hssvVXiXozldxr8v/y8KSFl\n6rvlqaBBw9xaXAEmNEb8Nml40r1Icsb+HK9MKfzDxukawZot3fkN5UfZUdaZSlUv\nBA/2LvVpAgMBAAECggEALDI/FEIanZdSIr+8eNZVptgLlSDHFBZmGUmlMnx+aeB1\nkvZGhNbrKOBhI3PfOH+QjY5k3ONtrA2JEXhseGze5W3RfFLfWYWIq84Q+SbEApqT\nSf910omd9/b05Xnfa/hssehCO3JGnKLrmef8sLLrkUi7gjsvk7//Zgx2z+xZ4Vh3\nBSE2x9dqyDDW/Au5KKEStbcVcNfxYaeOrfTk7bdp1OM8kJXhEt/Ik/I1z20vqg5k\nsf7s/hFkVyxN0khuKgmBGRSmOYqYUvttclfhKZSja9VzlW1Sz93dUI7VUXdxOQXe\nT5dkz2xFIStkwq/PeOiepJsMA9AyVM4+nYm9E/RZRwKBgQDvnXUtfwfNX9YzciOy\nJA4XFh6ZNxJnVPWl7YWUtn3Nq3rxc4Oh5FFpXGXVjujTBsfipb2Xcdoxwijkmthl\nR/M58Ab3vo1p5N+LULykWnZAQx4oOW6gf8QbGlmDzp6e6PqyrtHjnEmA7qX6YerU\nVko0GHE9oginZ7xQCAJbAxOYowKBgQDLP4OhnmefWVsP7KYRFwK5Y6j+3MnIMXIm\nd/PgbPIOYDCgqjYG4Qx0iqiqo02ycom9xpcihUqmDJWnR8hmLu79zab2cGpQXa08\nKnYBQfIlOwlaQqhRn60PVWWnsTPDKqE+F8thr9eHiTjPNiBjycV+3+t+AdkGWkKL\nOuQ9EDRegwKBgBRopuhfH30Aoq/zEtNDeufAfI60QB8I/3tIhc4q1QBFkM0r95Q8\nbCq7MflEmNQQicnmMAXMLrd6QB1oivHldPQEW7OSSV0xn1CwacDd66CBlvn6GlAV\nUdC1J9awLJaAZYn+leX7E8+lhAGVgXjgeKWDR3HmcTJBBasTY4/47RxdAoGAf9mX\nKq4jDri9sHmzSOLJouaO4qrt/xEjdhFUhmLhrKtTS21miNM9631hdd09vbeQ76Ch\nZ2SjPWqDJPPhmm2BhoO7uB+ksKMMmuE207mw4TyOuIlfqeCgkxmr1V2Baw5A2XdM\nR0m+cRKferDYlQzSP+oJD32IEBfs7foAomy0FJMCgYAD1LyAh4uwW/V2TTAR6wFA\n+rkQCOPxphTpfZS75crQuPGg+AAUSbk1CYbwLxZ+BgRXmawvP4ozY8rnXBVxj14q\nne2YO7zYrw4rpVUyH5ISkRYTv0GkvRQTVt+HVb0tczkHIe1F3BYAk9K7PezlQDgy\nHjsLpavVA7IEU6wKtNMIGg==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-d0zf2@infosp-48118.iam.gserviceaccount.com",
    "client_id": "108914050242358936997",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d0zf2%40infosp-48118.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

export const enviroment = {
    secretKey: '123456789',
    bucket: 'gs://infosp-48118.appspot.com',
    auth
}

export const configSendEmail = {
    host: "smtp.gmail.com",
    port: 587,
    user: "backofficewallet@gmail.com",
    password: "qfbbkwvgiatondye",
}