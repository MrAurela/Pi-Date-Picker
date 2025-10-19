
character_count = 10428747

with open("digits - billion.txt", "r") as read_file, open("digits - cut.txt", 'w') as write_file:
    first_n_characters = read_file.read(character_count)
    write_file.write(first_n_characters)