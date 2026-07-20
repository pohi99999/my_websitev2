import re

with open('app/admin/crm/page.tsx', 'r') as f:
    content = f.read()

# Find the fetchLeads function definition and the useEffect block
old_block = """  const fetchLeads = async () => {
    setLoading(true);
    try {
      const url = filter === 'all'
        ? 'http://localhost:3000/api/v1/potential-clients'
        : `http://localhost:3000/api/v1/potential-clients?status=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.ok) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filter]);"""

new_block = """  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const url = filter === 'all'
          ? 'http://localhost:3000/api/v1/potential-clients'
          : `http://localhost:3000/api/v1/potential-clients?status=${filter}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.ok) {
          setLeads(data.leads);
        }
      } catch (err) {
        console.error('Failed to fetch leads:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [filter]);"""

if old_block in content:
    content = content.replace(old_block, new_block)
    with open('app/admin/crm/page.tsx', 'w') as f:
        f.write(content)
    print("Replaced successfully")
else:
    print("Block not found!")
