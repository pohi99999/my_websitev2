import sys

with open('app/components/SequentialVideoBackground.tsx', 'r') as f:
    content = f.read()

# Add hasInitialized
content = content.replace(
    "const normalizedPath = pathname.replace( /^\/(en|de)(?=\/|$)/, '' ) || '/';",
    "const normalizedPath = pathname.replace( /^\/(en|de)(?=\/|$)/, '' ) || '/';\n  const hasInitialized = useRef(false);"
)

# Replace useEffect
old_effect = """  // Set initial video source on component mount
  useEffect( () =>
  {
    if ( !richMediaEnabled ) return;
    const initialSrc = getVideoForPath( pathname );
    const currentRef = activePlayer === 0 ? video0Ref : video1Ref;
    if ( currentRef.current )
    {
      currentRef.current.src = initialSrc;
      currentRef.current.load();
      currentRef.current.play().catch( error =>
      {
        console.error( "Initial autoplay was prevented:", error );
      } );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [richMediaEnabled] ); // Only run once on mount (or when richMediaEnabled changes)"""

new_effect = """  // Set initial video source on component mount
  useEffect( () =>
  {
    if ( !richMediaEnabled ) {
      hasInitialized.current = false;
      return;
    }
    if ( hasInitialized.current ) return;

    const initialSrc = getVideoForPath( pathname );
    const currentRef = activePlayer === 0 ? video0Ref : video1Ref;
    if ( currentRef.current )
    {
      currentRef.current.src = initialSrc;
      currentRef.current.load();
      currentRef.current.play().catch( error =>
      {
        console.error( "Initial autoplay was prevented:", error );
      } );
      hasInitialized.current = true;
    }
  }, [richMediaEnabled, pathname, activePlayer, video0Ref, video1Ref] ); // Run once on mount (or when richMediaEnabled changes)"""

if old_effect in content:
    content = content.replace(old_effect, new_effect)
    with open('app/components/SequentialVideoBackground.tsx', 'w') as f:
        f.write(content)
    print("Successfully patched!")
else:
    print("Could not find the effect to replace.")
