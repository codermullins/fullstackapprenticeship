import sanityClient from '@sanity/client'

export default sanityClient({
    // Find your project ID and dataset in `sanity.json` in your studio project
    projectId: 'musclhjv',
    dataset: 'production',
    useCdn: true,
    token: 'skYofh0GH4Dn5KqvXQ6nRNOyd5HnwYgaPqUGEEnk3fVLcOk0mScv8bRarhvxzZDBKj9dZfyhfpGrk8XRW1SS9oYd1ox2O5OWsSuoW5H8l6EwQJOeHXQ3hsHx73wEg7lmgM1LQ2L4vIIyCxXFT8SyaKdlBvLDrFoPdAoKkYvLAzCl2MHCqzIy'
    // useCdn == true gives fast, cheap responses using a globally distributed cache.
    // Set this to false if your application require the freshest possible
    // data always (potentially slightly slower and a bit more expensive).
})